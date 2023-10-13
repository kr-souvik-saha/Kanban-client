import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Typography } from "@mui/material";
import { editCardStyle, mainBoxStyle } from "./TaskCardStyle";

function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        sx={{ opacity: "30", backgroundColor: "black" }}
      />
    );
  }

  if (editMode) {
    return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={editCardStyle}
      >
        <textarea
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </Box>
    );
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      sx={mainBoxStyle}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <Typography
        sx={{ overflowY: "auto", overflowX: "hidden", whiteSpace: "pre-wrap" }}
      >
        {task.content}
      </Typography>

      {mouseIsOver && (
        <IconButton
          onClick={() => {
            deleteTask(task.id);
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default TaskCard;
