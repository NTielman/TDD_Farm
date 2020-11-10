// Utility functions
const get_costs_for_crop = (plantObj) => {
    const cost = plantObj.cost;
    const crops = plantObj.crops;

    return cost * crops;
};
const get_revenue_for_crop = (str) => str;
const get_profit_for_crop = (str) => str;
const get_total_profit = (str) => str;
const get_yield_for_plant = (str) => str;
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