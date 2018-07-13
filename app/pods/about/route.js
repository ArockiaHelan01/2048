import Route from '@ember/routing/route';

export default Route.extend({
    actions: {
        startGame(){
            this.get('router').transitionTo('home');
        }
    }
});
