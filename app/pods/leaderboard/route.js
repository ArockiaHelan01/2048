import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        var listing = [
            {
                "rank": 1,
                "user": "Naruil",
                "score": 4544,
                "country": "Germany" 
            },{
                "rank": 2,
                "user": "mukel",
                "score": 4444,
                "country": "India" 
            },{
                "rank": 3,
                "user": "david",
                "score": 3244,
                "country": "brazil" 
            },{
                "rank": 4,
                "user": "kivson",
                "score": 2344,
                "country": "sweden" 
            },{
                "rank": 5,
                "user": "stuart",
                "score": 1344,
                "country": "kenya" 
            },
            {
                "rank": 6,
                "user": "chin-shan",
                "score": 844,
                "country": "britain" 
            },
            {
                "rank": 7,
                "user": "steve",
                "score": 744,
                "country": "scotland" 
            },
            {
                "rank": 8,
                "user": "anto",
                "score": 544,
                "country": "finland" 
            },
            {
                "rank": 9,
                "user": "vincent",
                "score": 344,
                "country": "vience" 
            },
            {
                "rank": 10,
                "user": "reyu",
                "score": 244,
                "country": "thailand" 
            }
        ];
        return listing;
    },
    actions : {
        doSearch(){
            //console.log("Search initiated !!");
        }
    }
});
