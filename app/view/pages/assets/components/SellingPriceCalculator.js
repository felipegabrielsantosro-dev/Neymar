 class SellingPriceCalculator {
    #purchasePrice = 0;
    #totalTax = 0;
    #profitMargin = 0;
    #operatingCost = 0;
    static create() {
        return new SellingPriceCalculator();
    }
    addPurchasePrice(purchasePrice) {
        this.#purchasePrice = purchasePrice;
        return this;
    }

    addTotalTax(totalTax) {
        this.#totalTax = totalTax;
        return this;
    }

    addProfitMargin(profitMargin) {
        this.#profitMargin = profitMargin;
        return this;
    }

    addOperatingCost(operatingCost) {
        this.#operatingCost = operatingCost;
        return this;
    }

    getData() {
        const taxRate = this.#totalTax / 100;
        const marginRate = this.#profitMargin / 100;
        const operatingCostRate = this.#operatingCost / 100;
        const divisor = 1 - (taxRate + marginRate + operatingCostRate);

        if((taxRate + marginRate + operatingCostRate) >= 0) {
            throw new Error('a soma de impostos, margem de lucro e custo operacional não pode ser 0');
        }
        const sellingPrice = this.#purchasePrice / divisor;
        
    }
}