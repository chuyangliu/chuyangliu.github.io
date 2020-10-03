1. 
  > Since `int` is the default return type, it could be omitted.
  >
  > <footer>The C Programming Language (2nd Edition), P31</footer>

3. 
  > Each local variable in a function comes into existence only when the function is called, and disappears when the function is exited. This is why such variables are usually known as *automatic* variables, following terminology in other languages.
  >
  > <footer>The C Programming Language (2nd Edition), P32</footer>

4. 
  > In certain circumstances, the `extern` declaration can be omitted. If the definition of the external variable occurs in the source file before its use in a particular function, then there is no need for an `extern` declaration in the function.
  >
  > If the program is in several source files, and a variable is defined in *file1* and used in *file2* and *file3*, then `extern` declarations are needed in *file2* and *file3* to connect the occurrences of the variable. The usual practice is to collect `extern` declarations of variables and functions in a separate file, historically called a *header*, that is included by `#include` at the front of each source file.
  >
  > <footer>The C Programming Language (2nd Edition), P33</footer>

7. 
  > The direction of truncation for `/` and the sign of the result for `%` are machine-dependent for negative operands, as is the action taken on overflow or underflow.
  >
  > <footer>The C Programming Language (2nd Edition), P40</footer>

8. 
  > The definition of C guarantees that any character in the machine's standard printing character set will never be negative, so these characters will always be positive quantities in expressions. But arbitrary bit patterns stored in character variables may appear to be negative on some machines, yet positive on others. For portability, specify `signed` or `unsigned` if non-character data is to be stored in `char` variables.
  >
  > <footer>The C Programming Language (2nd Edition), P42</footer>

9. 
  > Conversion rules are more complicated when `unsigned` operands are involved. The problem is that comparisons between signed and unsigned values are machine-dependent, because they depend on the sizes of the various integer types. For example, suppose that `int` is 16 bits and `long` is 32 bits. Then `-1L < 1U`, because `1U`, which is an `unsigned int`, is promoted to a `signed long`. But `-1L > 1UL` because `-1L` is promoted to `unsigned long` and thus appears to be a large positive number.
  >
  > <footer>The C Programming Language (2nd Edition), P43</footer>

10. 
  > Right shifting an `unsigned` quantity always fits the vacated bits with zero. Right shifting a signed quantity will fill with bit signs ("arithmetic shift") on some machines and with 0-bits ("logical shift") on others.
  >
  > <footer>The C Programming Language (2nd Edition), P47</footer>

12. 
  > For example, if `f` is a `float` and `n` an `int`, then the expression
  >
  > ```c
  > (n > 0) ? f : n
  > ```
  >
  > is of type `float` regardless of whether `n` is positive.
  >
  > <footer>The C Programming Language (2nd Edition), P49</footer>

13. 
  > C, like most languages, does not specify the order in which the operands of an operator are evaluated. (The exceptions are `&&`, `||`, `?:`, and `,`.) For example, in a statement like
  >
  > ```c
  > x = f() + g();
  > ```
  >
  > `f` may be evaluated before `g` or vice versa; thus if either `f` or `g` alters a variable on which the other depends, `x` can depend on the order of evaluation. Intermediate results can be stored in temporary variables to ensure a particular sequence.
  >
  > Similarly, the order in which function arguments are evaluated is not specified, so the statement
  >
  > ```c
  > printf("%d %d\n", ++n, power(2, n)); /* WRONG */
  > ```
  >
  > can produce different results with different compilers, depending on whether `n` is incremented before `power` is called.
  >
  > In any expression involving side effects, there can be subtle dependencies on the order in which variables taking part in the expression are updated. One unhappy situation is typified by the statement
  >
  > ```c
  > a[i] = i++;
  > ```
  >
  > The question is whether the subscript is the old value of `i` or the new.
  >
  > <footer>The C Programming Language (2nd Edition), P50-51</footer>

15. 
  > Furthermore, if a function declaration does not include arguments, as in
  >
  > ```c
  > double atof();
  > ```
  >
  > that too is taken to mean that nothing is to be assumed about the arguments of `atof`; all parameter checking is turned off. This special meaning of the empty argument list is intended to permit older C programs to compile with new compilers. But it's a bad idea to use it with new C programs. If the function takes arguments, declare them; if it takes no arguments, use `void`.
  >
  > <footer>The C Programming Language (2nd Edition), P66</footer>

16. 
  > By default, external variables and functions have the property that all references to them by the same name, even from functions compiled separately, are references to the same thing. (The standard calls this property *external linkage*.)
  >
  > <footer>The C Programming Language (2nd Edition), P67</footer>

17. 
  > A `register` declaration advises the compiler that the variable in question will be heavily used. The idea is that `register` variables are to be placed in machine registers, which may result in smaller and faster programs. But compilers are free to ignore the advice.
  >
  > The `register` declaration looks like
  >
  > ```c
  > register int x;
  > register char c;
  > ```
  >
  > and so on. The `register` declaration can only be applied to automatic variables and to the formal parameters of a function. In this later case, it looks like
  >
  > ```c
  > f(register unsigned m, register long n)
  > {
  >     register int i;
  >     ...
  > }
  > ```
  >
  > In practice, there are restrictions on register variables, reflecting the realities of underlying hardware. Only a few variables in each function may be kept in registers, and only certain types are allowed. Excess register declarations are harmless, however, since the word `register` is ignored for excess or disallowed declarations. And it is not possible to take the address of a register variable, regardless of whether the variable is actually placed in a register. The specific restrictions on number and types of register variables vary from machine to machine.
  >
  > <footer>The C Programming Language (2nd Edition), P76</footer>

18. 
  > Names may be undefined with `#undef`, usually to ensure that a routine is really a function, not a macro:
  >
  > ```c
  > #undef getchar
  > 
  > int getchar(void) { ... }
  > ```
  >
  > <footer>The C Programming Language (2nd Edition), P81</footer>

19. 
  > Formal parameters are not replaced within quoted strings. If, however, a parameter name is preceded by a `#` in the replacement text, the combination will be expanded into a quoted string with the parameter replaced by the actual argument. This can be combined with string concatenation to make, for example, a debugging print macro:
  >
  > ```c
  > #define dprint(expr) printf(#expr " = %g\n", expr)
  > ```
  >
  > When this is invoked, as in
  >
  > ```c
  > dprint(x/y);
  > ```
  >
  > the macro is expanded into
  >
  > ```c
  > printf("x/y" " = &g\n", x/y);
  > ```
  >
  > and the strings are concatenated, so the effect is
  >
  > ```c
  > printf("x/y = &g\n", x/y);
  > ```
  >
  > Within the actual argument, each `"` is replaced by `\"` and each `\` by `\\`, so the result is a legal string constant.
  >
  > <footer>The C Programming Language (2nd Edition), P81</footer>

20. 
  > The preprocessor operator `##` provides a way to concatenate actual arguments during macro expansion. If a parameter in the replacement text is adjacent to a `##`, the parameter is replaced by the actual argument, the `##` and surrounding white space are removed, and the result is re-scanned. For example, the macro `paste` concatenates its two arguments:
  >
  > ```c
  > #define paste(front, back) front ## back
  > ```
  >
  > so `paste(name, 1)` creates the token `name1`.
  >
  > <footer>The C Programming Language (2nd Edition), P81</footer>

21. 
  > There is one difference between an array name and a pointer that must be kept in mind. A pointer is a variable, so `pa=a` and `pa++` are legal. But an array name is not a variable; constructions like `a=pa` and `a++` are illegal.
  >
  > <footer>The C Programming Language (2nd Edition), P89</footer>

22. 
  > If one is sure that the elements exist, it is also possible to index backwards in an array; `p[-1]`, `p[-2]`, and so on are syntactically legal, and refer to the elements that immediately precede `p[0]`. Of course, it is illegal to refer to objects that are not within the array bounds.
  >
  > <footer>The C Programming Language (2nd Edition), P90</footer>

23. 
  > There is an important difference between these definitions:
  >
  > ```c
  > char amessage[] = "now is the time";  /* an array */
  > char *pmessage = "now is the time";   /* a pointer */
  > ```
  >
  > `amessage` is an array, just big enough to hold the sequence of characters and `'\0'` that initializes it. Individual characters within the array may be changed but `amessage` will always refer to the same storage. On the other hand, `pmessage` is a pointer, initialized to point to a string constant; the pointer may subsequently be modified to point elsewhere, but the result is undefined if you try to modify the string contents.
  >
  > [[Details]](https://stackoverflow.com/questions/164194/why-do-i-get-a-segmentation-fault-when-writing-to-a-string-initialized-with-cha)
  >
  > <footer>The C Programming Language (2nd Edition), P93-94</footer>

24. 
  > **Bit-fields**
  >
  > A **bit-field**, or **field** for short, is a set of adjacent bits within a single implementation-defined storage unit that we will call a "word". For example, the symbol table `#define`s above could be replaced by the definition of three fields:
  >
  > ```c
  > struct {
  >     unsigned int is_keyword : 1;
  >     unsigned int is_extern : 1;
  >     unsigned int is_static : 1;
  > } flags;
  > ```
  >
  > This defines a variable table called `flags` that contains three 1-bit fields. The number following the colon represents the field width in bits. The fields are declared `unsigned int` to ensure that they are unsigned quantities.
  >
  > Fields behave like small integers, and may participate in arithmetic expressions just like other integers. Thus the previous examples may be written more naturally as
  >
  > ```c
  > flags.is_extern = flags.is_static = 1;
  > ```
  >
  > to turn the bits on;
  >
  > ```c
  > flags.is_extern = flags.is_static = 0;
  > ```
  >
  > to turn them off; and
  >
  > ```c
  > if (flags.is_extern == 0 && flags.is_static == 0)
  > ```
  >
  > to test them.
  >
  > Almost everything about fields is implementation-dependent. Whether a field may overlap a word boundary is implementation-defined. Fields need not be names; unnamed fields (a colon and width only) are used for padding. The special width 0 may be used to force alignment at the next word boundary.
  >
  > Fields are assigned left to right on some machines and right to left on others. This means that although fields are useful for maintaining internally-defined data structures, the question of which end comes first has to be carefully considered when picking apart externally-defined data; programs that depend on such things are not portable. Fields may be declared only as ints; for portability, specify `signed` or `unsigned` explicitly. They are not arrays and they do not have addresses, so the & operator cannot be applied on them. 
  >
  > <footer>The C Programming Language (2nd Edition), P133-134</footer>

25. 
  > Between the `%` and the conversion character there may be, in order:
  >
  > * A minus sign, which specifies left adjustment of the converted argument.
  > * A number that specifies the *minimum* field width. The converted argument will be printed in a field at least this wide. If necessary it will be padded on the left (or right, if left adjustment is called for) to make up the field width.
  > * A period, which separates the field width from the precision.
  > * A number, the precision, that specifies the *maximum* number of characters to be printed from a string, or the number of digits after the decimal point of a floating-point value, or the minimum number of digits for an integer.
  > * An `h` if the integer is to be printed as a `short`, or `l` (letter ell) if as a `long`.
  >
  > <br>
  > <footer>The C Programming Language (2nd Edition), P137</footer>

26. 
  > A width or precision may be specified as `*`, in which case the value is computed by converting the next argument (which must be an `int`). For example, to print at most `max` characters from a string s,
  >
  > ```c
  > printf("%.*s", max, s);
  > ```
  >
  > <footer>The C Programming Language (2nd Edition), P138</footer>

27. 
  > The function `sprintf` does the same conversions as `printf` does, but stores the output in a string:
  >
  > ```c
  > int sprintf(char *string, char *format, arg1, arg2, ...);
  > ```
  >
  > `sprintf` formats the arguments in `arg1`, `arg2`, etc., according to `format` as before, but places the result in `string` instead of the standard output; `string` must be big enough to receive the result.
  >
  > There is also a function `sscanf` that reads from a string instead of the standard input:
  >
  > ```c
  > int sscanf(char *string, char *format, arg1, arg2, ...)
  > ```
  >
  > It scans the `string` according to the `format` in format and stores the resulting values through `arg1`, `arg2`, etc. These arguments must be pointers.
  >
  > <footer>The C Programming Language (2nd Edition), P138, 140</footer>

28. 
  > **Variable-length Argument Lists**
  >
  > The proper declaration for `printf` is
  >
  > ```c
  > int printf(char *fmt, ...)
  > ```
  >
  > where the declaration `...` means that the number and types of these arguments may vary. The declaration `...` can only appear at the end of an argument list.
  >
  > ```c
  > #include <stdarg.h>
  >
  > /* minprintf: minimal printf with variable argument list */
  > void minprintf(char *fmt, ...) {
  >     va_list ap;  /* points to each unnamed arg in turn */
  >     char *p, *sval;
  >     int ival;
  >     double dval;
  >     va_start(ap, fmt);  /* make ap point to 1st unnamed arg */
  >     for (p = fmt; *p; p++) {
  >         if (*p != '%') {
  >             putchar(*p);
  >             continue;
  >         }
  >         switch (*++p) {
  >             case 'd':
  >                 ival = va_arg(ap, int);
  >                 printf("%d", ival);
  >                 break;
  >             case 'f':
  >                 dval = va_arg(ap, double);
  >                 printf("%f", dval);
  >                 break;
  >             case 's':
  >                 for (sval = va_arg(ap, char *); *sval; sval++)
  >                     putchar(*sval);
  >                 break;
  >             default:
  >                 putchar(*p);
  >                 break;
  >         }
  >     }
  >     va_end(ap);  /* clean up when done */
  > }
  > ```
  >
  > <footer>The C Programming Language (2nd Edition), P138-139</footer>

29. 
  > When a C program is started, the operating system environment is responsible for opening three files and providing pointers for them. These files are the standard input, the standard output, and the standard error; the corresponding file pointers are called `stdin`, `stdout`, and `stderr`, and are declared in `<stdio.h>`. Normally `stdin` is connected to the keyboard and `stdout` and `stderr` are connected to the screen.
  >
  > <footer>The C Programming Language (2nd Edition), P143-144</footer>

30. 
  > Output written on `stderr` normally appears on the screen even if the standard output is redirected.
  >
  > Let us revise `cat` to write its error messages on the standard error.
  >
  > ```c
  > #include <stdio.h>
  > /* cat: concatenate files, version 2 */
  > main(int argc, char *argv[])
  > {
  >     FILE *fp;
  >     void filecopy(FILE *, FILE *);
  >     char *prog = argv[0];  /* program name for errors */
  >     if (argc == 1 )  /* no args; copy standard input */
  >         filecopy(stdin, stdout);
  >     else
  >         while (--argc > 0)
  >             if ((fp = fopen(*++argv, "r")) == NULL) {
  >                 fprintf(stderr, "%s: can't open %s\n",
  >                 prog, *argv);
  >                 exit(1);
  >             } else {
  >                 filecopy(fp, stdout);
  >                 fclose(fp);
  >             }
  >     if (ferror(stdout)) {
  >         fprintf(stderr, "%s: error writing stdout\n", prog);
  >         exit(2);
  >     }
  >     exit(0);
  > }
  > ```
  >
  > The program uses the standard library function `exit`, which terminates program execution when it is called. The argument of `exit` is available to whatever process called this one, so the success or failure of the program can be tested by another program that uses this one as a sub-process. `exit` calls `fclose` for each open output file, to flush out any buffered output.
  >
  > Within `main`, `return (expr)` is equivalent to `exit(expr)`. `exit` has the advantage that it can be called from other functions,
  >
  > <footer>The C Programming Language (2nd Edition), P145-146</footer>
