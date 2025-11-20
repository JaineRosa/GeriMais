import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Hero } from './hero/hero';
import { Funcionalidades } from "./funcionalidades/funcionalidades";
import { Resultados } from "./resultados/resultados";
import { SectionHero } from '../../shared/components/section-hero/section-hero';
import { Depoimentos } from './depoimentos/depoimentos';
import { Faq } from './faq/faq';
import { Cta } from './cta/cta';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, Funcionalidades, Resultados,SectionHero, Depoimentos,Faq,Cta],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
