let pcodes = ["SALE10", "FREESHIP", "VIP50"];
let used:any = {}; 

export async function check(code: any, user: any, price: any) {

    
    if (!pcodes.includes(code)) {
        return {ok:false, m:"no"};
    }

    if (used[user] && used[user].indexOf(code) > -1) {
        return {ok:false, m:"used before!!!"};
    }

    let discount = 0
    if(code === "SALE10") {
        discount = price * 0.1
    } else if (code === "FREESHIP") {
        discount = 50
    } else if(code=="VIP50"){
        discount = price / 2
    }

    if(!used[user]) used[user]=[]
    used[user].push(code)

    return {
        ok:true,
        m:"yay",
        disc: discount,
        final: price - discount < 0 ? 0 : price-discount
    }
}
