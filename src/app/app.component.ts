import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines', {
      query: {
        orderByValue: true
      }
    });



    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating'
      }
    });

    this.exists = this.af.database.object('/restaurants/1/features/1');

    this.exists.take(1).subscribe(x => {
      if (x && x.$value) console.log("EXISTS");
      else console.log("NOT EXISTS");
    });

    // add new restaurant add /restaurants
    this.af.database.list('/restaurants').push({ name: '' })
      .then(x => {
        // x.key (returned key after object creation)
        let restaurant = {name: 'My New Restaurant'};
        let update = {};
        update['restaurants/' + x.key] = restaurant; // Update existing just created object
        update['restaurants-by-city/camberwell/' + x.key] = restaurant; // Update another node that has relationto this object

        this.af.database.object('/').update(update);
      });

    // add new restaurants at city /restaurant-by-city/camberwell

    // this.restaurants = this.af.database.list('/restaurants')
    //   .map(restaurants => {
    //     restaurants.map(restaurant => {
    //       restaurant.featureTypes = [];
    //       for (var f in restaurant.features)
    //         restaurant.featureTypes.push(this.af.database.object('/features/' + f));
    //     });
    //     return restaurants;
    //   });
  }
}
