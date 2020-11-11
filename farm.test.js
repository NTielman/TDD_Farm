const {
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield
} = require("./farm");

//--------------------- declare test variables ---------------------
const corn = {
    name: "corn",
    cost: 1, //cost to plant 1 plant 
    salePrice: 3, //price per kilo sold
    yield: 30, //yield of 1 crop in kilo's

    factors: { //environmental factors
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        }
    },
};

const apple = {
    name: "apple",
    cost: 0.75, //cost to plant 1 plant 
    salePrice: 2, //price per kilo sold
    yield: 5, //yield of 1 crop in kilo's

    factors: { //environmental factors
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
    cost: 5, //cost to plant 1 plant 
    salePrice: 5, //price per kilo sold
    yield: 6, //yield of 1 crop in kilo's

    factors: { //environmental factors
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

//-------------- run tests without environment factors --------------
test("Get costs per crop", () => {

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: apple, num_crops: 2 },
        { crop: avocado, num_crops: 7 }
    ];

    const expected = [5, 1.50, 35];
    const output = crops.map(plant => get_costs_for_crop(plant));
    expect(output).toEqual(expected);
});

test("Get revenue per crop", () => {

    const crops = [
        { crop: corn, num_crops: 15 },
        { crop: apple, num_crops: 8 },
        { crop: avocado, num_crops: 47 }
    ];

    const expected = [1350, 80, 1410];
    const output = crops.map(plant => get_revenue_for_crop(plant));
    expect(output).toEqual(expected);
});

test("Get profit per crop", () => {

    const crops = [
        { crop: corn, num_crops: 16 },
        { crop: apple, num_crops: 20 },
        { crop: avocado, num_crops: 8 }
    ];

    const expected = [1424, 185, 200];
    const output = crops.map(plant => get_profit_for_crop(plant));
    expect(output).toEqual(expected);
});

test("Get total profit for all crops", () => {

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: apple, num_crops: 150 },
        { crop: avocado, num_crops: 67 }
    ];

    const expected = 3507.50;
    const output = get_total_profit(crops);
    expect(output).toEqual(expected);
});

test("Get yield for plant with no environment factors", () => {

    expect(get_yield_for_plant(corn)).toBe(30);
    expect(get_yield_for_plant(apple)).toBe(5);
    expect(get_yield_for_plant(avocado)).toBe(6);
});

test("Get yield for crop with no environment factors", () => {

    const crops = {
        crop: corn,
        num_crops: 10,
    };

    expect(get_yield_for_crop(crops)).toBe(300);
});

test("Calculate total yield with multiple crops", () => {

    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };
    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: pumpkin, num_crops: 2 },
    ];
    expect(get_total_yield(crops)).toBe(158);
});

test("Calculate total yield with 0 amount", () => {

    const crops = [{ crop: corn, num_crops: 0 }];
    expect(get_total_yield(crops)).toBe(0);
});

//---------------- run tests with environment factors ---------------
test("Get yield for plant with environment factors", () => {

    //has no weakness to environment factors
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    //has weakness, but weakness not present in environment factors
    const banana = {
        name: "banana",
        yield: 17,
        factors: { //environmental factors
            rain: {
                low: 0,
                medium: 20,
                high: 50,
            }
        }
    };

    expect(get_yield_for_plant(pumpkin, environment_factors)).toBe(4);
    expect(get_yield_for_plant(banana, environment_factors)).toBe(17);
    expect(get_yield_for_plant(corn, environment_factors)).toBe(15);
    expect(get_yield_for_plant(apple, environment_factors)).toBe(1.74);
    expect(get_yield_for_plant(avocado, environment_factors)).toBe(1.92);
});

/*
test("Get yield for crop with environment factors", () => {

    const crops = {
        crop: corn,
        num_crops: 10,
    };

    expect(get_yield_for_crop(crops)).toBe(300);
});

test("Get profit per crop", () => {

    const crops = [
        { crop: corn, num_crops: 16 },
        { crop: apple, num_crops: 20 },
        { crop: avocado, num_crops: 8 }
    ];

    const expected = [1424, 185, 200];
    const output = crops.map(plant => get_profit_for_crop(plant));
    expect(output).toEqual(expected);
});

test("Get total profit for all crops", () => {

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: apple, num_crops: 150 },
        { crop: avocado, num_crops: 67 }
    ];

    const expected = 3507.50;
    const output = get_total_profit(crops);
    expect(output).toEqual(expected);
});
 */