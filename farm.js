// Utility functions
const get_costs_for_crop = (crop) => {
    const cost = crop.crop.cost;
    const crops = crop.num_crops;

    return cost * crops;
};

const get_revenue_for_crop = (crop) => {
    const cropYield = crop.num_crops * crop.crop.yield;
    const salePrice = crop.crop.salePrice;

    return salePrice * cropYield;
};

const get_profit_for_crop = (crop) => {
    const cost = get_costs_for_crop(crop);
    const revenue = get_revenue_for_crop(crop);

    return revenue - cost;
};

const get_total_profit = (arrayOfCrops) => {
    const cropProfit = arrayOfCrops.map(crop => get_profit_for_crop(crop));
    const totalProfit = cropProfit.reduce((acumulator, currentValue) => acumulator + currentValue);

    return totalProfit;
};

const get_yield_for_plant = (plant) => plant.yield;

const get_yield_for_crop = (crop) => {
    return crop.num_crops * get_yield_for_plant(crop.crop);
};

const get_total_yield = (arrayOfCrops) => {
    const cropYield = arrayOfCrops.map(crop => get_yield_for_crop(crop));
    const totalYield = cropYield.reduce((acumulator, currentValue) => acumulator + currentValue);

    return totalYield;
};

module.exports = {
    get_costs_for_crop,
    get_revenue_for_crop,
    get_profit_for_crop,
    get_total_profit,
    get_yield_for_plant,
    get_yield_for_crop,
    get_total_yield
};