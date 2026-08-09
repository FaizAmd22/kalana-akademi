export function toOrderPayload<T extends { id: string }>(items: T[]) {
  return items.map((item, index) => ({ id: item.id, order: index }))
}
