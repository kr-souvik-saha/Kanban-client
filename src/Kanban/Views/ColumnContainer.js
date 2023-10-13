import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import {
  draggingBox,
  iconStyle,
  styleHeaderBox,
  styleMainBox,
} from "./ColumnContainerStyle";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <Box ref={setNodeRef} style={style} sx={draggingBox}></Box>;
  }
  return (
    <>
      <Box ref={setNodeRef} style={style} sx={styleMainBox}>
        <Box
          {...attributes}
          {...listeners}
          sx={styleHeaderBox}
          onClick={() => {
            setEditMode(true);
          }}
        >
          {/* Header Box */}
          <Box>1</Box>
          <Box>
            {" "}
            {!editMode && column.title}
            {editMode && (
              <input
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </Box>

          <IconButton
            onClick={() => deleteColumn(column.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: "flexGrow", height: "70%" }}>
          {tasks.map((task) => (
            <SortableContext items={taskIds}>
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </SortableContext>
          ))}
        </Box>

        <Icon
          sx={iconStyle}
          onClick={() => {
            createTask(column.id);
          }}
        >
          +
        </Icon>
      </Box>
    </>
  );
}

export default ColumnContainer;
