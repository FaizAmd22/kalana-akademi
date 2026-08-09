import { createContext, useContext, type ReactNode } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon } from "lucide-react"

import { TableRow } from "@/components/ui/table"

interface DragHandleContextValue {
  attributes: ReturnType<typeof useSortable>["attributes"]
  listeners: ReturnType<typeof useSortable>["listeners"]
}

const DragHandleContext = createContext<DragHandleContextValue | null>(null)

export function SortableRow({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <DragHandleContext.Provider value={{ attributes, listeners }}>
      <TableRow ref={setNodeRef} style={style}>
        {children}
      </TableRow>
    </DragHandleContext.Provider>
  )
}

export function DragHandle() {
  const ctx = useContext(DragHandleContext)
  return (
    <button
      type="button"
      className="cursor-grab touch-none text-muted-foreground hover:text-foreground active:cursor-grabbing"
      {...ctx?.attributes}
      {...ctx?.listeners}
    >
      <GripVerticalIcon className="size-4" />
      <span className="sr-only">Seret untuk urutkan</span>
    </button>
  )
}
