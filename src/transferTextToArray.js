export default function transferTextToArray(text) {
    const parts = text.split('-');
    const start = parseInt(parts[0]);
    const end = parseInt(parts[1]);
    const result = [];
  
    for (let i = start; i <= end; i++) {
      result.push(i.toString());
    }
  
    return result;
  }