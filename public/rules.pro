
%%%%%%%%%%% Populations %%%%%%%%%%%

population(fox).
population(rabbit).
population(grass).

hunts(fox, rabbit).

consumes(fox, rabbit).
consumes(rabbit, grass).

maxpop(fox, 5).
maxpop(rabbit, 9).
maxpop(grass, 30).

%%%%%%%%%%% Die Faces %%%%%%%%%%%

resource(hunt).
resource(hide).
resource(grow).
resource(rest).

% The cost to add a resource to a face.
resource_basecost(hunt, 1).
resource_basecost(hide, 2).
resource_basecost(grow, 3).
resource_basecost(rest, 3).

:- discontiguous
  modifies/2,
  modifier_effectstage/2,
  apply_modifier/4.

modifies(reroll_activation, die_face).
modifier_effectstage(reroll_activation, reroll).
onstage_apply_modifier(reroll, reroll_activation, face(Syms), keep(Syms)).

/*
// grow
if (energy <= 0) { return }
setEnergy(energy - 1);
setPopulation(population + 1);
spend();
*/

apply_dieface(grow) -->
  {
    target(population(Pop)),
    population_energy(Pop, E0),
    E0 #> 0
  },
  change(Pop, population, P->P + 1),
  change(Pop, energy, E -> E - 1).
  