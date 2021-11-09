export default function Collected(payment, cash) {
  let output = "";
  if (cash) {
    output += cash;
  }

  if (payment === "TRUE") {
    output = "✅" + "\n" + output;
  } else if (payment === "FALSE") {
    output = "❌" + "\n" + output;
  } else {
    output = payment + "\n" + output;
  }
  return output;
}
