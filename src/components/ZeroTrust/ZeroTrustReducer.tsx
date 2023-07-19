export interface IFZTReducer {
    name: string;
    cost: number;
    description: string;
    filename: string;
    pillars: string[];
    phases: string[];
    showPopup: boolean;
    selectedCtr: string;
    scores: Record<string, number>;
}
  
export const emptyZTReducer: IFZTReducer = {
    showPopup: false,
    selectedCtr: '1.1.1',
    name: '',
    cost: 0,
    description: '',
    filename: '',
    pillars: [],
    phases: [],
    scores: {},
};

export default function ZeroTrustReducer(state:any, action:any){
    switch(action.type) {
        case 'update':
            return {
                ...state,
                [action.field]: action.payload,
            };
        case 'init':
            return {
                ...state,
                ...action.payload
            };
        case 'closePopup':
            return {
                ...state,
                showPopup: false,
            };
        case 'setPopup':
            return {
                ...state,
                showPopup: true,
                selectedCtr: action.payload,
            };
        default:
            return state;
    }
};