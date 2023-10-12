import { defineStore } from "pinia";

export const useFilterStore = defineStore("filterStore", {
    state: () => ({
        searchText: "",
        orderBy: "none",
        cityId: {},
        selectedCities: [] as string[],
        date: {} as { _gte?: Date, _lte?: Date | number | string },
        price: {} as { _gte?: number, _lte?: number }
    })
})