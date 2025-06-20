import { useId } from 'react';
import { DragOverlay as DndDragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';

import Portal from '@mui/material/Portal';

import ItemBase from '../item/item-base';
import ColumnBase from '../column/column-base';
import { KanbanColumnToolBar } from '../column/kanban-column-toolbar';

// ----------------------------------------------------------------------

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export function KanbanDragOverlay({ columns, tasks, activeId, sx }) {
  const uniqueId = useId();

  const columnIds = columns.map((column) => column.id);
  const activeColumn = columns.find((column) => column.id === activeId);

  const allTasks = Object.values(tasks).flat();
  const activeTask = allTasks.find((task) => task.id === activeId);

  return (
    <Portal>
      <DndDragOverlay adjustScale={false} dropAnimation={dropAnimation}>
        {activeId != null ? (
          columnIds.includes(activeId) ? (
            <ColumnOverlay key={uniqueId} column={activeColumn} tasks={tasks[activeId]} sx={sx} />
          ) : (
            <TaskItemOverlay key={uniqueId} task={activeTask} sx={sx} />
          )
        ) : null}
      </DndDragOverlay>
    </Portal>
  );
}

// ----------------------------------------------------------------------

function ColumnOverlay({ column, tasks, sx }) {
  return (
    <ColumnBase
      slots={{
        header: <KanbanColumnToolBar columnName={column.name} totalTasks={tasks.length} />,
        main: tasks.map((task) => <ItemBase key={task.id} task={task} />),
      }}
      stateProps={{ dragOverlay: true }}
      sx={sx}
    />
  );
}

// ----------------------------------------------------------------------

function TaskItemOverlay({ task, sx }) {
  return <ItemBase task={task} sx={sx} stateProps={{ dragOverlay: true }} />;
}
