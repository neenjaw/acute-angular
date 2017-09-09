import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL TO WEB api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(name: String): Promise<Hero> {
    return this.http
               .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
               .toPromise()
               .then(respose => respose.json().data as Hero)
               .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http
               .get(url)
               .toPromise()
               .then(response => response.json().data as Hero)
               .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http
               .delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

  /**
   * Function to gracefully handle any errors
   * @param  {any}          error Any error that may occur
   * @return {Promise<any>}       Return the rejected promise
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // for demo only
    return Promise.reject(error.message || error);
  }
}
