function sumOne(...args)
{
    let sum =0;
    for(const arg of args)
    {
        sum += arg;
    }
    return sum;
}

console.log(sumOne(2,4));

