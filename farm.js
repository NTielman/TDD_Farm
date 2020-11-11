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
    const cropYield = crop.num_crops * get_yield_for_plant(crop.crop, environment_factors);

    //this line is used throughout to avoid math errors with floating point numbers
    return Math.round((cropYield + Number.EPSILON) * 100) / 100;
};

const get_total_yield = (arrayOfCrops, environment_factors) => {
    const cropYield = arrayOfCrops.map(crop => get_yield_for_crop(crop, environment_factors));
    const totalYield = cropYield.reduce((acumulator, currentValue) => acumulator + currentValue);

    return Math.round((totalYield + Number.EPSILON) * 100) / 100;
};

const get_costs_for_crop = (crop) => {
    const cost = crop.crop.cost;
    const crops = crop.num_crops;

    return Math.round(((cost * crops) + Number.EPSILON) * 100) / 100;
};

const get_revenue_for_crop = (crop, environment_factors) => {
    const cropYield = get_yield_for_crop(crop, environment_factors);
    const salePrice = crop.crop.salePrice;

    return Math.round(((salePrice * cropYield) + Number.EPSILON) * 100) / 100;
};

const get_profit_for_crop = (crop, environment_factors) => {
    const cost = get_costs_for_crop(crop);
    const revenue = get_revenue_for_crop(crop, environment_factors);

    return Math.round(((revenue - cost) + Number.EPSILON) * 100) / 100;
};

const get_total_profit = (arrayOfCrops, environment_factors) => {
    const cropProfit = arrayOfCrops.map(crop => get_profit_for_crop(crop, environment_factors));
    const totalProfit = cropProfit.reduce((acumulator, currentValue) => acumulator + currentValue);

    return Math.round((totalProfit + Number.EPSILON) * 100) / 100;
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