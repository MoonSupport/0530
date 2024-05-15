import * as fs from "fs";

type Record = {
  id: number;
  data: any;
};

class Database {
  private records: Record[] = [];
  private currentId: number = 1;
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.loadFromFile();
  }

  private loadFromFile(): void {
    if (fs.existsSync(this.filePath)) {
      const fileData = fs.readFileSync(this.filePath, "utf-8");
      const jsonData = JSON.parse(fileData);
      this.records = jsonData.records || [];
      this.currentId = jsonData.currentId || 1;
    }
  }

  private saveToFile(): void {
    const jsonData = {
      records: this.records,
      currentId: this.currentId,
    };
    fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2), "utf-8");
  }

  public addRecord(data: any): Record {
    const newRecord: Record = {
      id: this.currentId,
      data: data,
    };
    this.records.push(newRecord);
    this.currentId++;
    this.saveToFile();
    return newRecord;
  }

  public getRecord(id: number): Record | undefined {
    return this.records.find((record) => record.id === id);
  }

  public getAllRecords(): Record[] {
    return this.records;
  }

  public consumeRecords(): Record[] {
    const records = this.getAllRecords();
    this.records = [];
    this.currentId = 0;
    this.saveToFile();
    return records;
  }

  public deleteRecord(id: number): boolean {
    const recordIndex = this.records.findIndex((record) => record.id === id);
    if (recordIndex !== -1) {
      this.records.splice(recordIndex, 1);
      this.saveToFile();
      return true;
    }
    return false;
  }
}

export default Database;
