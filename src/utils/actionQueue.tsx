// tao hang doi chay cac function biat dong bo FIFO
class ActionQueue {
  // mang cac ham async khong nhan tham so (() => Promise<void>)
  private queue: (() => Promise<void>)[] = [];
  // de kiem xoat chi co 1 process dang chay
  private isProcessing = false;

  //   hanh dong vao hang doi nhaanj vaof 1 action laf async function
  enqueue(action: () => Promise<void>) {
    // them hanh dong vao cuoi hang doi
    this.queue.push(action);
    this.process();
  }
  //   xu ly lay action ra khoi hang doi va chay
  private async process() {
    // kiem tra xem co queue nao dang duoc chay hay khong, neu cos se khong cho chay tiep, de tranh trung lap
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    while (this.queue.length > 0) {
      // lay action dau hang
      const action = this.queue.shift();
      if (action) {
        try {
          await action();
        } catch (error) {
          console.error("Error processing action:", error);
        }
      }
    }
    this.isProcessing = false;
  }
}
export const actionQueue = new ActionQueue();
