import React from "react";
import { Flex } from "@mantine/core";
import TaskItem from "./TaskItem";

import { useTaskStore } from "../store/taskStore";
import AddTaskCard from "./AddTaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const moveTask = useTaskStore((state) => state.moveTask);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    moveTask(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Droppable droppableId="task-list" direction="horizontal">
          {(provided) => (
            <Flex
              ref={provided.innerRef}
              {...provided.droppableProps}
              gap="md"
              direction="row"
              wrap="wrap"
              style={{
                flex: 1,
                maxWidth: `calc(3 * 375px + 2 * 16px)`, // 3 карточки + 2 gap'а
                minWidth: 0,
              }}
            >
                      <AddTaskCard />
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.7 : 1,
                        margin: 0,
                      }}
                    >
                      <TaskItem
                        task={task}
                        onDelete={() => deleteTask(String(task.id))}
                        onSave={(updatedTask) => updateTask(String(task.id), updatedTask)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Flex>
    </DragDropContext>
  );
}

export default TaskList;
