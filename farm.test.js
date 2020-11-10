const {
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield,
} = require("./farm");

const corn = {
    name: "corn",
    cost: 1, //kosten om 1 plant te zaaien
    crops: 230, //verzameling planten van dit soort 
    salePrice: 3, //wat je met 1 kilo verdient
    yield: 30, //opbrengst van 1 plant in kilo's

    factors: { //omgevingsfactoren
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        },
        temperature: {
            low: 0,
            medium: 20,
            high: -70,
        }
    },
};

const apple = {
    name: "apple",
    cost: 0.75, //kosten om 1 plant te zaaien
    crops: 6, //verzameling planten van dit soort 
    salePrice: 2, //wat je met 1 kilo verdient
    yield: 5, //opbrengst van 1 plant in kilo's

    factors: { //omgevingsfactoren
        sun: {
            low: -60,
            medium: 0,
            high: 40,
        },
        temperature: {
            low: -40,
            medium: 20,
            high: 10,
        },
        ground: {
            low: 0,
            medium: 45,
            high: -25,
        },
    },
};

const avocado = {
    name: "avocado",
    cost: 5, //kosten om 1 plant te zaaien
    crops: 75, //verzameling planten van dit soort 
    salePrice: 5, //wat je met 1 kilo verdient
    yield: 6, //opbrengst van 1 plant in kilo's

    factors: { //omgevingsfactoren
        sun: {
            low: -20,
            medium: 0,
            high: 50,
        },
        wind: {
            low: 0,
            medium: -30,
            high: -60,
        },
    },
};
const environment_factors = {
    sun: "low",
    wind: "high",
    temperature: "low",
    ground: "medium"
};

const myCrops = [corn, apple, avocado];

test("Get costs per crop", function () {

    const expected = [230, 4.50, 375];
    const output = myCrops.map(plant => get_costs_for_crop(plant));
    expect(output).toEqual(expected);
});

test("Get revenue per crop", function () {

    const expected = [20700, 60, 2250];
    const output = myCrops.map(plant => get_revenue_for_crop(plant));
    expect(output).toEqual(expected);
});

// describe("get_yield_for_plant", () => {
//     const corn = {
//         name: "corn",
//         yield: 30,
//     };

//     test("Get yield for plant with no environment factors", () => {
//         expect(get_yield_for_plant(corn)).toBe(30);
//     });
// });

// describe("get_yield_for_crop", () => {
//     test("Get yield for crop, simple", () => {
//         const corn = {
//             name: "corn",
//             yield: 3,
//         };
//         const input = {
//             crop: corn,
//             num_crops: 10,
//         };
//         expect(get_yield_for_crop(input)).toBe(30);
//     });
// });

// describe("get_total_yield", () => {
//     test("Calculate total yield with multiple crops", () => {
//         const corn = {
//             name: "corn",
//             yield: 3,
//         };
//         const pumpkin = {
//             name: "pumpkin",
//             yield: 4,
//         };
//         const crops = [
//             { crop: corn, num_crops: 5 },
//             { crop: pumpkin, num_crops: 2 },
//         ];
//         expect(get_total_yield({ crops })).toBe(23);
//     });

//     test("Calculate total yield with 0 amount", () => {
//         const corn = {
//             name: "corn",
//             yield: 3,
//         };
//         const crops = [{ crop: corn, num_crops: 0 }];
//         expect(get_total_yield({ crops })).toBe(0);
//     });
// });

