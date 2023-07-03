export function exportToCSV(dbName: string, storeName: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Abrir conexão com o IndexedDB
    const request = window.indexedDB.open(dbName);

    request.onerror = function (event: any) {
      reject(new Error('Erro ao abrir conexão com o IndexedDB'));
    };

    request.onsuccess = function (event: any) {
      const db = event.target.result;

      // Abrir uma transação de leitura no objeto de armazenamento
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);

      const data: any[] = [];

      // Recuperar todos os registros do objeto de armazenamento
      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = function (event: any) {
        const records = event.target.result;

        // Formatar os dados em formato CSV
        const csv = formatDataToCSV(records);

        resolve(csv);
      };

      getAllRequest.onerror = function (event: any) {
        reject(new Error('Erro ao recuperar registros do IndexedDB'));
      };
    };

    request.onupgradeneeded = function (event: any) {
      reject(new Error('Atualização necessária para o IndexedDB'));
    };
  });
}

function formatDataToCSV(data: any[]): string {
  // Crie uma string CSV formatada com base nos dados fornecidos
  // Aqui está um exemplo simples que apenas converte os valores para uma string separada por vírgulas
  const rows = data.map((record) => Object.values(record).join(','));
  const header = Object.keys(data[0]).join(',');
  return `${header}\n${rows.join('\n')}`;
}