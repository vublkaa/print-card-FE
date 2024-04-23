import { useState } from 'react';
import * as XLSX from 'xlsx';


const PrintCarzCard = () => {
  const [arrayIDCard, setArrayIDCard] = useState<string[]>([]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as any);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[];
      // console.log(excelData); // Dữ liệu từ file Excel
      // Xử lý dữ liệu từ workbook ở đây
      setArrayIDCard(prev => [...prev, ...excelData.flat()])
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="">
      {arrayIDCard.length ? (
        <div className="grid grid-flow-col grid-rows-6 grid-cols-6 p-10">
          {arrayIDCard.map((item, index) => <p className="border border-black border-separate py-4 text-center" key={index}>{item}</p>)}
        </div>
      ) : <div className="w-screen h-screen flex items-center justify-center">
        <input type="file" onChange={handleFileUpload} />
      </div>}
    </div>
  )
};

export default PrintCarzCard