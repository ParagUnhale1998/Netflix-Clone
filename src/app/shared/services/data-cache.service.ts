import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {

  private cache: { [key: string]: any } = {};

  constructor() {}

  set(key: string, value: any): void {
    this.cache[key] = value;
  }

  get(key: string): any {
    return this.cache[key];
  }

  remove(key: string): void {
    delete this.cache[key];
  }

  clear(): void {
    this.cache = {};
  }
}