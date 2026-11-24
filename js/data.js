export const items = [
  {
    id: "c1",
    title: "Еспресо",
    sku: "ES-001",
    image: "espresso.png",
    imageAlt: "Чашка чорного еспресо на дерев'яному столі",
    category: "coffee",
    price: 45,
    volume: 40,
    addedAt: "2026-02-14",
    description: "Щільна крема.",
    inStock: true,
    sizes: [
      { name: "Одинарний", volume: 30, unit: "мл", price: 40, calories: 5 },
      { name: "Подвійний", volume: 60, unit: "мл", price: 55, calories: 10 }
    ]
  },
  {
    id: "c2",
    title: "Лате",
    sku: "LT-002",
    image: "latte.png",
    imageAlt: "Висока склянка лате зі спіненим молоком",
    category: "coffee",
    price: 80,
    volume: 350,
    addedAt: "2026-01-20",
    description: "М'який кавовий напій з великою порцією спіненого молока.",
    inStock: true,
    sizes: [
      { name: "Мала", volume: 250, unit: "мл", price: 70, calories: 140 },
      { name: "Середня", volume: 350, unit: "мл", price: 80, calories: 180 },
      { name: "Велика", volume: 450, unit: "мл", price: 95, calories: 220 }
    ]
  },
  {
    id: "c3",
    title: "Капучино",
    sku: "CP-003",
    image: "cappuccino.png",
    imageAlt: "Чашка капучино з молочною пінкою та латте-артом",
    category: "coffee",
    price: 75,
    volume: 300,
    addedAt: "2026-03-12",
    description: "Еспресо з ніжною молочною пінкою та легкою солодкістю.",
    inStock: true,
    sizes: [
      { name: "Мала", volume: 200, unit: "мл", price: 60, calories: 90 },
      { name: "Середня", volume: 300, unit: "мл", price: 75, calories: 120 },
      { name: "Велика", volume: 400, unit: "мл", price: 95, calories: 160 }
    ]
  },
  {
    id: "c4",
    title: "Матча Лате",
    sku: "ML-004",
    image: "matcha-latte.png",
    imageAlt: "Матча лате з зеленим візерунком на пінці",
    category: "tea",
    price: 95,
    volume: 300,
    addedAt: "2026-04-02",
    description: "Японський зелений чай матча з вершковим молоком.",
    inStock: true,
    sizes: [
      { name: "Мала", volume: 250, unit: "мл", price: 85, calories: 150 },
      { name: "Середня", volume: 300, unit: "мл", price: 95, calories: 180 }
    ]
  },
  {
    id: "c5",
    title: "Чізкейк Нью-Йорк",
    sku: "CH-005",
    image: "cheesecake.png",
    imageAlt: "Шматочок чізкейка Нью-Йорк з ягодами",
    category: "dessert",
    price: 120,
    volume: null,
    addedAt: "2025-11-03",
    description: "Класичний вершковий чізкейк із хрусткою піщаною основою з печива, вершкового сиру, яєць і ванілі. Зверху – тонкий шар ягідного соусу, тож опис складу довший за сусідні картки, а ціна все одно стоїть на одному рівні з ними.",
    inStock: true,
    sizes: [
      { name: "Шматок", volume: 150, unit: "г", price: 120, calories: 420 },
      { name: "Подвійний", volume: 280, unit: "г", price: 210, calories: 780 }
    ]
  },
  {
    id: "c6",
    title: "Сезонний гарбузовий лате зі збитими вершками",
    sku: "PL-006",
    image: "pumpkin-latte.png",
    imageAlt: "Гарбузовий лате зі збитими вершками",
    category: "seasonal",
    price: 110,
    volume: 450,
    addedAt: "2026-10-01",
    description: "Лате з запеченим гарбузовим пюре, еспресо, паровим молоком, корицею, мускатним горіхом і щіпкою гвоздики. Подається зі збитими вершками.",
    inStock: true,
    sizes: [
      { name: "Середня", volume: 350, unit: "мл", price: 100, calories: 240 },
      { name: "Велика", volume: 450, unit: "мл", price: 110, calories: 310 }
    ]
  },
  {
    id: "c7",
    title: "Ромашковий чай",
    sku: "RM-007",
    image: "chamomile.png",
    imageAlt: "Чашка ромашкового чаю з квітами ромашки",
    category: "tea",
    price: 55,
    volume: 250,
    addedAt: "2025-06-18",
    description: "Квіти ромашки.",
    inStock: false,
    sizes: [
      { name: "Чашка", volume: 250, unit: "мл", price: 55, calories: 2 },
      { name: "Чайник", volume: 600, unit: "мл", price: 90, calories: 5 }
    ]
  },
  {
    id: "c8",
    title: "Tiramisu",
    sku: "TR-008",
    image: "tiramisu.png",
    imageAlt: "Десерт тірамісу з какао в прозорій склянці",
    category: "dessert",
    price: 115,
    volume: 180,
    addedAt: "2026-05-09",
    description: "Італійський десерт з маскарпоне, кавою та какао.",
    inStock: true,
    sizes: [
      { name: "Порція", volume: 180, unit: "г", price: 115, calories: 390 }
    ]
  },
  {
    id: "c9",
    title: "Ґоджі-чай",
    sku: "GJ-009",
    image: "chamomile.png",
    imageAlt: "Прозора чашка чаю з ягодами годжі",
    category: "tea",
    price: 70,
    volume: 250,
    addedAt: "2026-07-01",
    description: "Настій ягід годжі з цедрою апельсина.",
    inStock: true,
    sizes: [
      { name: "Чашка", volume: 250, unit: "мл", price: 70, calories: 20 },
      { name: "Чайник", volume: 600, unit: "мл", price: 110, calories: 45 }
    ]
  },
  {
    id: "c10",
    title: "Єгипетський чай",
    sku: "EG-010",
    image: "matcha-latte.png",
    imageAlt: "Склянка чаю з м'ятою",
    category: "tea",
    price: 65,
    volume: 250,
    addedAt: "2026-06-11",
    description: "Чорний чай з м'ятою.",
    inStock: true,
    sizes: [
      { name: "Чашка", volume: 250, unit: "мл", price: 65, calories: 4 }
    ]
  },
  {
    id: "c11",
    title: "Ірландська кава",
    sku: "IR-011",
    image: "espresso.png",
    imageAlt: "Келих кави з шаром вершків",
    category: "coffee",
    price: 90,
    volume: 200,
    addedAt: "2026-08-19",
    description: "Гаряча кава з вершками.",
    inStock: true,
    sizes: [
      { name: "Келих", volume: 200, unit: "мл", price: 90, calories: 160 }
    ]
  },
  {
    id: "c12",
    title: "Їжачок",
    sku: "YZ-012",
    image: "cheesecake.png",
    imageAlt: "Шоколадний десерт, усипаний горіхами",
    category: "dessert",
    price: 85,
    volume: 90,
    addedAt: "2026-09-01",
    description: "Шоколадний десерт із горіхами.",
    inStock: true,
    sizes: [
      { name: "Порція", volume: 90, unit: "г", price: 85, calories: 340 }
    ]
  },
  {
    id: "c13",
    title: "Флет вайт",
    sku: "FW-013",
    image: "latte.png",
    imageAlt: "Чашка флет вайту з тонким шаром молока",
    category: "coffee",
    price: 75,
    volume: 180,
    addedAt: "2026-03-01",
    description: "Подвійний еспресо з тонким шаром молока.",
    inStock: true,
    sizes: [
      { name: "Чашка", volume: 180, unit: "мл", price: 75, calories: 80 }
    ]
  }
];

export function findItem(items, id) {
  if (typeof id !== "string" || id === "") {
    return null;
  }
  return items.find((item) => item.id === id) ?? null;
}
