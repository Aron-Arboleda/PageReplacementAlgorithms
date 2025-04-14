// import nerdamer from 'nerdamer/all.js';

// // const equation = "x^3 - 6x^2 + 11x - 6 = 0";
// // const solution = nerdamer.solve(equation, "x");
// // console.log(solution.toString()); // Output: [5]

// // const addition = nerdamer("0.1 + 0.2").text("decimals");
// // console.log(addition.toString()); // Outputs: 4.6
// // console.log(0.1 + 0.2);

// // const equation = "x^3 - 4.5*x^2 + 5.25*x - 1.125 = 0"; // Cubic equation with decimals
// // const solutions = nerdamer.solve(equation, "x");

// // const solutionList = Array.from(solutions);
// // // Convert the solutions into an array of numbers
// // console.log(solutionList);

// var sol = nerdamer
//   .solveEquations('2x+5=15')
//   .map((solution) => nerdamer(solution).evaluate().text());
// console.log(sol[0]);

// // // Define the function f(x) = x + 56
// // function momentAvailable(c) {
// //   return ((c * c) / 2) * 1 - 56 * c;
// // }

// // // Newton-Raphson solver
// // function solveForC(
// //   equation,
// //   initialGuess = 135.27,
// //   tolerance = 0.0001,
// //   maxIterations = 100
// // ) {
// //   // Define the derivative f'(x) = 1
// //   function fPrime(x) {
// //     return 1;
// //   }

// //   let x = initialGuess;
// //   for (let i = 0; i < maxIterations; i++) {
// //     let fx = equation(x);
// //     let fpx = fPrime(x);

// //     if (Math.abs(fx) < tolerance) {
// //       console.log(`Converged after ${i + 1} iterations`);
// //       return x; // Solution found
// //     }
// //     if (fpx === 0) {
// //       throw new Error("Derivative is zero, cannot continue.");
// //     }

// //     let nextX = x - fx / fpx;
// //     x = nextX;
// //     console.log(`Iteration ${i + 1}: x = ${x}, f(x) = ${equation(x)}`);
// //   }
// //   throw new Error("Solution did not converge.");
// // }

// // // Test it
// // try {
// //   const solution = solveForC(momentAvailable); // Initial guess: x = 0
// //   console.log("Solution: x =", solution); // x = -56
// // } catch (e) {
// //   console.error(e);
// // }

// // // // F2
// // // const steelArea = (p / 2) * columnArea;
// // // const times600 = steelArea * 600;

// // // // F3
// // // const halfOfF3 = Math.pow(0.85, 2) * fc * columnSize;
// // // const columnSizeOver2 = columnSize / 2;

// // //   let AstForChecking = 600 * ((columnSize - cc - c) / c);
// // // let AscForComputation = 600 * ((columnSize - cc) / c) * steelArea;
// // // let AscForChecking = 600 * ((columnSize - cc) / c);

// // // const tryCase = (axis) => {
// // //   let cGuess = 0.05; // Initial guess for c
// // //   let Asc, Ast;
// // //   for (let caseNum = 1; caseNum <= 4; caseNum++) {
// // //     const steelAreas = computeSteelAreas(
// // //       caseNum,
// // //       cGuess,
// // //       columnSizeM,
// // //       Pnrequired,
// // //       columnArea
// // //     );
// // //     Asc = steelAreas.Asc;
// // //     Ast = steelAreas.Ast;
// // //     const exOrEy = axis === "x" ? ex : ey;
// // //     const { c, Pnavailable, momentAvailable } = solveForNeutralAxisDepth(
// // //       Asc,
// // //       Ast,
// // //       columnSizeM,
// // //       columnArea,
// // //       exOrEy
// // //     );
// // //     cGuess = c;
// // //     const AscStrain = (c - 0.05) / c;
// // //     const AstStrain = (columnSizeM - 0.05 - c) / c;
// // //     const AscStress = checkYield(AscStrain);
// // //     const AstStress = checkYield(AstStrain);
// // //     const AscYields = AscStress >= 280;
// // //     const AstYields = AstStress >= 280;
// // //     if (
// // //       (caseNum === 1 && AscYields && !AstYields) ||
// // //       (caseNum === 2 && !AscYields && AstYields) ||
// // //       (caseNum === 3 && !AscYields && !AstYields) ||
// // //       (caseNum === 4 && AscYields && AstYields)
// // //     ) {
// // //       return { Pnavailable, momentAvailable, Asc, Ast, c };
// // //     }
// // //   }
// // //   throw new Error("No valid case found for column strength");
// // // };
// // // const xAxisResult = tryCase("x");
// // // const yAxisResult = tryCase("y");
// // // return {
// // //   PnavailableX: xAxisResult.Pnavailable,
// // //   momentAvailableX: xAxisResult.momentAvailable,
// // //   AscX: xAxisResult.Asc,
// // //   AstX: xAxisResult.Ast,
// // //   cX: xAxisResult.c,
// // //   PnavailableY: yAxisResult.Pnavailable,
// // //   momentAvailableY: yAxisResult.momentAvailable,
// // //   AscY: yAxisResult.Asc,
// // //   AstY: yAxisResult.Ast,
// // //   cY: yAxisResult.c,
// // // };

// // // let Pnavailable, Ast, Asc;

// // //       // F1
// // //       let AstForComputation = (p / 2) * columnArea * Fy;

// // //       otherVariables = {
// // //         times600,
// // //         cc,
// // //         halfOfF3,
// // //         AstForComputation,
// // //         exOrEy,
// // //         columnSize,
// // //         columnSizeOver2,
// // //       };

// // //       // To deal with positive or negative
// // //       if (exOrEy > columnSizeOver2) {
// // //         c = solveForC(equationForC_1, otherVariables);
// // //       } else {
// // //         c = solveForC(equationForC_2, otherVariables);
// // //       }

// // //       let AstForChecking = 600 * ((columnSize - cc - c) / c);
// // //       let AscForComputation = 600 * ((columnSize - cc) / c) * steelArea;
// // //       let AscForChecking = 600 * ((columnSize - cc) / c);

// // //       if (Ast > Fy && Asc < Fy) {
// // //         Pnavailable =
// // //           Math.pow(0.85, 2) * fc * c * columnSize +
// // //           AscForComputation -
// // //           AstForComputation;
// // //       } else {
// // //       }

// import { derivative, evaluate } from 'mathjs';

// export function solveForC(
//   equation,
//   guess = 1,
//   maxIterations = 100,
//   tolerance = 1e-7,
// ) {
//   try {
//     let c = guess; // Initial guess

//     for (let i = 0; i < maxIterations; i++) {
//       // Evaluate f(c)
//       let f_c = evaluate(equation, { c });

//       // Evaluate f'(c) (derivative)
//       let f_prime_c = evaluate(derivative(equation, 'c').toString(), { c });

//       if (Math.abs(f_prime_c) < tolerance) {
//         throw new Error(
//           "Derivative too small; Newton's method may not converge.",
//         );
//       }

//       // Newton's iteration formula
//       let c_new = c - f_c / f_prime_c;

//       // Check for convergence
//       if (Math.abs(c_new - c) < tolerance) {
//         return c_new; // Solution found
//       }

//       c = c_new;
//     }

//     throw new Error("Newton's method did not converge.");
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

//console.log(solveForC('c^2 - 4'));

// import nerdamer from 'nerdamer/all.js';

// export function computeString(equation) {
//   const result = nerdamer(equation).evaluate().text();
//   return result;
// }

// console.log(computeString('0.1 + 0.2'));

// import { evaluate } from 'mathjs';

// console.log(); // true
// console.log(evaluate('20 >= 20')); // false
// console.log(evaluate('3 + 2 == 5')); // true
