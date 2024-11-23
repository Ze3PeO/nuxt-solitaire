export default function (rank: number): string {
  // ToDo Format rank label based on locale

  const rankLabels: { [key: number]: string } = {
    0: "A",
    1: "2",
    2: "3",
    3: "4",
    4: "5",
    5: "6",
    6: "7",
    7: "8",
    8: "9",
    9: "10",
    10: "J",
    11: "Q",
    12: "K",
  };

  return rankLabels[rank];
}
