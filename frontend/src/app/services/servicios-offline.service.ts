import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServiciosOfflineService {
  private abrir(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('glamgo-offline', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('servicios');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Almacenamiento bloqueado'));
    });
  }
  async leer<T>(cuenta: string): Promise<T[] | undefined> {
    const db = await this.abrir();
    try {
      return await new Promise<T[] | undefined>((resolve, reject) => {
        const tx = db.transaction('servicios', 'readonly');
        const req = tx.objectStore('servicios').get(cuenta);
        req.onsuccess = () => resolve(req.result as T[] | undefined);
        req.onerror = () => reject(req.error);
        tx.onabort = () => reject(tx.error);
      });
    } finally { db.close(); }
  }
  async guardar<T>(cuenta: string, servicios: T[]): Promise<void> {
    const db = await this.abrir();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('servicios', 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
        tx.objectStore('servicios').put(servicios, cuenta);
      });
    } finally { db.close(); }
  }
}
