import { Box, Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import {
  createContainerValidation,
  deleteContainerValidation,
  getAllContainerValidation,
  updateContainerValidation,
} from "../Validations/ContainerValidation";
import {
  createTaskValidation,
  deleteTaskValidation,
  getAllTaskValidation,
  updateTaskValidation,
} from "../Validations/TaskValidation";

function KanbanBoard() {
  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllContainerValidation();
      if (response.status === 200) {
        setColumns(response.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllTaskValidation();
      if (response.status === 200) {
        setTasks(response.data);
      }
    }

    fetchData();
    console.log(tasks);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  async function createNewColumn() {
    const columnToAdd = {
      title: `Column Title`,
    };
    const response = await createContainerValidation(columnToAdd);
    if (response.status === 201) {
      setColumns([...columns, response.data]);
    }
  }

  async function deleteColumn(id) {
    const response = await deleteContainerValidation(id);
    if (response.status === 200) {
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);
    }
  }

  async function updateColumn(id, title) {
    const response = await updateContainerValidation({ id, title });
    if (response.status === 201) {
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return response.data;
      });

      setColumns(newColumns);
    }
  }

  async function createTask(columnId) {
    const newTask = {
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    const response = await createTaskValidation(newTask);
    if (response.status === 201) {
      setTasks([response.data, ...tasks]);
    }
  }

  async function deleteTask(id) {
    const response = await deleteTaskValidation(id);

    if (response.status === 200) {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    }
  }

  async function updateTask(id, content) {
    const response = await updateTaskValidation({ id, content });
    if (response.status === 201) {
      const newTasks = tasks.map((task) => {
        if (task.id !== id) return task;
        return response.data;
      });

      setColumns(newTasks);
    }

    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <Box sx={{ backgroundColor: "#FFA1F5" }}>
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              ></ColumnContainer>
            ))}
          </SortableContext>
        </Box>
        <Button variant="outlined" onClick={() => createNewColumn()}>
          Add Collumn
        </Button>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                  (task) => (task.columnId = activeColumn.id)
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Box>
  );
}

export default KanbanBoard;
