// Cross-validation and human review queue (in-memory placeholder)
export type ReviewStatus = 'pending' | 'in-review' | 'approved' | 'rejected';

export type ReviewItem = {
  id: string;
  source: string;
  status: ReviewStatus;
  assignedTo?: string;
  createdAt?: string;
  due?: string;
  notes?: string;
};

export class ReviewQueue {
  private queue: ReviewItem[] = [];

  enqueue(item: ReviewItem): void {
    this.queue.push(item);
  }

  peek(): ReviewItem | undefined {
    return this.queue[0];
  }

  dequeue(): ReviewItem | undefined {
    return this.queue.shift();
  }

  updateStatus(id: string, status: ReviewStatus): boolean {
    const idx = this.queue.findIndex((q) => q.id === id);
    if (idx >= 0) {
      this.queue[idx].status = status;
      return true;
    }
    return false;
  }
}
