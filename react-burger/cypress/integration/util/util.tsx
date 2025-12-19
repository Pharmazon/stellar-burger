import {readFileSync} from 'fs';

/**
 * Синхронно читает JSON-файл и парсит его в тип T с валидацией
 * @param fixturePath - путь к JSON-файлу (фикстуре)
 * @returns объект типа T
 * @throws если файл не найден, JSON повреждён или валидация не пройдена
 */
export function readFixture<T>(fixturePath: string): T {
    let jsonString: string;
    let path = "../fixtures/" + fixturePath + ".json";
    try {
        jsonString = readFileSync(path, 'utf8');
    } catch (e) {
        throw new Error(`Failed to read fixture file "${path}": ${(e as Error).message}`);
    }

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        throw new Error(`Invalid JSON in "${path}": ${(e as Error).message}`);
    }
}