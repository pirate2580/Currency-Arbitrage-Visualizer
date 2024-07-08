import { Graph } from "../models/Graph.model";

class graphService {
  static async getGraph(){
    const graph = {};
    const currencies = await Graph.find({});
    currencies.forEach(currency => {
      graph[currency.baseCurrency] = currency.exchangeRates;
    });
    return graph;
  }

  static async mapToObject(map: { [key: string]: Map<string, number> }): Promise<{ [key: string]: { [key: string]: number } }> {
    const obj: { [key: string]: { [key: string]: number } } = {};
  
    // Type assertion to iterate over Object.entries safely
    Object.entries(map).forEach(([baseCurrency, innerMap]) => {
      obj[baseCurrency] = {};
  
      // Type assertion to iterate over innerMap safely
      (innerMap as Map<string, number>).forEach((rate, targetCurrency) => {
        obj[baseCurrency][targetCurrency] = rate;
      });
    });
  
    return obj;
  }
  

  static async bellmanFord(){
    const rawGraph = await this.getGraph();
    const graph = await this.mapToObject(rawGraph);
    const opportunitiesid = new Set();
    const opportunities = new Set();

    // console.log(graph);

    // O(n^4), for 52 currencies, 52^4 = 7311616 steps
    for (let start in graph){
    const distance = {};
    const predecessor = {};

    for (let vertex in graph){
      distance[vertex] = Infinity;
      predecessor[vertex] = '';
    }
    distance[start] = 0;
    const n = 52;

    for (let i = 1; i <= n - 1; i++){
      for (let startcurrency in graph){
        for (let exchangecurrency in graph[startcurrency]){
          // console.log(startcurrency, exchangecurrency)
          const exchangerate = graph[startcurrency][exchangecurrency];
          if (distance[exchangecurrency] > distance[startcurrency] - Math.log2(exchangerate)){
            distance[exchangecurrency] = distance[startcurrency] - Math.log2(exchangerate)
            predecessor[exchangecurrency] = startcurrency;
          }
        }
      }
    }
    // console.log(start);
    // console.log(distance);
    // console.log();
    const {profit, cycle, id, profitRates} = await this.negativeCycles(n, graph, distance, predecessor);
    // console.log(`I am psychic: ${profitRates}`);
    if (!opportunitiesid.has(id) && profit > 1){
      // console.log({profit, cycle, profitRates});
      opportunities.add({profit, cycle, profitRates});
      opportunitiesid.add(id);
    }
    }
    // console.log(opportunities);
    return opportunities;
  }
  static async negativeCycles(n, graph, distance, predecessor){
    let negCycle: string = '';

    for (let startcurrency in graph){
      // console.log(startcurrency);
      for (let exchangecurrency in graph[startcurrency]){
        const exchangerate = graph[startcurrency][exchangecurrency];
        // console.log(exchangerate);
        if (distance[exchangecurrency] > distance[startcurrency] -Math.log2(exchangerate)){
          negCycle = startcurrency;
          // console.log(`***NEGATIVE CYCLE ${negCycle}***`);
          break; 
        }
      }
      if (negCycle){
        break;
      }
    }
  
    if (negCycle){
  
      let cycle: string[] = [];
      let curr_vertex: string = negCycle;
  
      // Detect the cycle
      for (let i = 0; i < n; i++) {
        curr_vertex = predecessor[curr_vertex];
      }
  
      let cycle_start = curr_vertex;
      cycle.push(cycle_start);
      let prev_vertex = cycle_start;
      curr_vertex = predecessor[cycle_start];
      let profit = 1;
      let profitRates: number[] = [];
      profit *= graph[prev_vertex][curr_vertex];
      profitRates.push(graph[prev_vertex][curr_vertex]);
      while (curr_vertex !== cycle_start) {
        cycle.push(curr_vertex);
        prev_vertex = curr_vertex;
        curr_vertex = predecessor[curr_vertex];
        profit *= graph[prev_vertex][curr_vertex];
        profitRates.push(graph[prev_vertex][curr_vertex]);
      }
      cycle.push(curr_vertex); // To include the start vertex at the end
      // console.log(profit, cycle);
      return { profit , cycle, id: cycle.join(' '), profitRates };
    }
    return { profit: 0, cycle: [], id: '' , profitRates:[]}; 
  }
}

export {graphService}