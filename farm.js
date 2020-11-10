// Utility functions
const get_costs_for_crop = (plantObj) => {
    const cost = plantObj.cost;
    const crops = plantObj.crops;

    return cost * crops;
};

const get_revenue_for_crop = (plantObj) => {
    const cropYield = plantObj.crops * plantObj.yield;
    const salePrice = plantObj.salePrice;

    return salePrice * cropYield;
};

const get_profit_for_crop = (plantObj) => {
    const cost = get_costs_for_crop(plantObj);
    const revenue = get_revenue_for_crop(plantObj);

    return revenue - cost;
};

const get_total_profit = (arrayOfCrops) => {
    const cropProfit = arrayOfCrops.map(crop => get_profit_for_crop(crop));
    const totalProfit = cropProfit.reduce((acumulator, currentValue) => acumulator + currentValue);

    return totalProfit;
};

const get_yield_for_plant = (plantObj) => plantObj.yield;

const get_yield_for_crop = (str) => str;
const get_total_yield = (str) => str;


module.exports = {
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield
};