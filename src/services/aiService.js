export async function askAI(prompt) {
  /*const res = await fetch("http://localhost:3001/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });*/
  
  const res = await fetch("/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});

  const data = await res.json();
  return data.raw;   // نُرجع النص فقط

  /*try {
    return JSON.parse(data.raw);
  } catch {
    return {
      message: data.raw,
      workout: [],
      nutritionTip: "",
      levelDecision: null,
    };
  }*/
}
