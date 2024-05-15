class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // Add an element to the end of the queue
  enqueue(element: T): void {
    this.items.push(element);
  }

  // Remove an element from the front of the queue
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // Peek at the front element of the queue without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the size of the queue
  size(): number {
    return this.items.length;
  }

  // Clear all elements from the queue
  clear(): void {
    this.items = [];
  }
}

export default Queue;
