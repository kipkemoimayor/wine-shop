export interface Cost {
    bottle: number;
    case: number
}
export interface Wine {
    caseQty: any;
    bottleQty: any;
    no: string;
    name: string;
    image: string;
    cost: Cost;
    tags: string[];
    details: string;
}
