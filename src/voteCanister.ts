import { Canister, nat64, query, Record, text, update, Vec, Void } from 'azle';

let options: string[] = [];
let result: {
    [key:string]:nat64
}={}

export default Canister({
    getOptions:query([],Vec(text), ()=>{
        return options;
    }),
    addOption: update([text], Vec(text), (newOptions) => {
        options.push(newOptions);
        result[newOptions]=BigInt(0);
        return options
    }),
    resetOptuin:update([],text,()=>{
        options=[];
        result={};
        return 'success'
    }),
    deleteOpstion: update([text], Vec(text), (option) => {
        let tmpIndex=options.indexOf(option)
        if(tmpIndex!==-1){
            options.splice(tmpIndex,1);
            options.sort
            delete result[option]
        }
        return options
    }),
    addVote:update([text],text,(option)=>{
        if (options.includes(option)) {
            result[option]+=BigInt(1)
            return 'success'
        }
        return 'failed'
    }),
    getResult: query([], Vec(Record({ key: text, value: nat64 })), () => {
        const entries = Object.entries(result).map(([key, value]) => ({ key, value }));
        return entries;
        
    }),


});

