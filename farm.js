const get_yield_for_plant = (plant, environment_factors) => {
    const getPlantWeakness = plant.factors;
    const arrayOfDecimals = [];

    //checks if environment factors are present && if plant has weaknesses
    if (environment_factors && getPlantWeakness) {

        Object.keys(getPlantWeakness).forEach(keyWord => {
            //checks for match(es) between plantWeakness & environment factors
            if (Object.keys(environment_factors).includes(keyWord)) {

                //returns low, medium or high
                const factorIntensity = environment_factors[`${keyWord}`];

                //returns percentage of impact factor has on plant
                const factorImpact = getPlantWeakness[`${keyWord}`][`${factorIntensity}`];

                //converts percentage to decimal number
                const decimalNumber = (100 + factorImpact) / 100;
                arrayOfDecimals.push(decimalNumber);
            }
        });

        //multiplies original plant yield by impact decimalNumber(s)
        /*if arrayOfDecimals is empty because no match between plantWeakness 
        & environment factors was found, returns original plant.yield*/
        let impactedYield = arrayOfDecimals.reduce((acumulator, currentValue) => {
            return acumulator * currentValue;
        }, plant.yield);

        //rounds up to 2 decimals when necessary
        impactedYield = Math.round((impactedYield + Number.EPSILON) * 100) / 100;

        return impactedYield;
    } else {

        return plant.yield;
    }

};

const get_yield_for_crop = (crop, environment_factors) => {
    return crop.num_crops * get_yield_for_plant(crop.crop, environment_factors);
};

const get_total_yield = (arrayOfCrops) => {
    const cropYield = arrayOfCrops.map(crop => get_yield_for_crop(crop));
    const totalYield = cropYield.reduce((acumulator, currentValue) => acumulator + currentValue);

    return totalYield;
};

const get_costs_for_crop = (crop) => {
    const cost = crop.crop.cost;
    const crops = crop.num_crops;

    return cost * crops;
};

const get_revenue_for_crop = (crop, environment_factors) => {
    const cropYield = get_yield_for_crop(crop, environment_factors);
    const salePrice = crop.crop.salePrice;

    return salePrice * cropYield;
};

const get_profit_for_crop = (crop, environment_factors) => {
    const cost = get_costs_for_crop(crop);
    const revenue = get_revenue_for_crop(crop, environment_factors);

    return revenue - cost;
};

const get_total_profit = (arrayOfCrops, environment_factors) => {
    const cropProfit = arrayOfCrops.map(crop => get_profit_for_crop(crop, environment_factors));
    const totalProfit = cropProfit.reduce((acumulator, currentValue) => acumulator + currentValue);

    return totalProfit;
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