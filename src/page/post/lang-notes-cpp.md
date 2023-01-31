1. 
  > **C++ Arithmetic Types**
  >
  > ![](/media/cpp_primer_5_tbl_2_1.png)
  > 
  > <footer>C++ Primer (5th Edition), P60</footer>

1. 
  > Unlike the other integer types, there are three **distinct** basic character types: `char`, `signed char` and `unsigned char`. In particular, `char` is not the same type as `signed char`. Although there are three character types, there are only two representations: signed and unsigned. The (plain) `char` type uses one of these representations. Which of the other two character representations is equivalent to `char` depends on the compiler.
  > 
  > <footer>C++ Primer (5th Edition), P62</footer>

1. 
  > Use `double` for floating-point computations; `float` usually does not have enough precision, and the cost of double-precision calculations versus single-precision is negligible. In fact, on some machines, double-precision operations are faster than single. The precision offered by `long double` usually is unnecessary and often entails considerable run-time cost.
  > 
  > See also [float vs double - C++ Forum](http://www.cplusplus.com/forum/beginner/214007/).
  >
  > <footer>C++ Primer (5th Edition), P63</footer>

1. 
  > **Caution: Don’t Mix Signed and Unsigned Types.**
  > 
  > <footer>C++ Primer (5th Edition), P66</footer>

1. 
  > **Character and String Literals**
  >
  > ![](/media/cpp_primer_5_tbl_2_2.png)
  > 
  > <footer>C++ Primer (5th Edition), P68</footer>

1. 
  > We can also write a **generalized escape sequence**, which is `\x` followed by one or more *hexadecimal* digits or a `\` followed by one, two, or three *octal* digits.
  > 
  > <footer>C++ Primer (5th Edition), P69</footer>

1. 
  > A **declaration** makes a name known to the program. A file that wants to use a name defined elsewhere includes a declaration for that name. A **definition** creates the associated entity.
  >
  > We can provide an initializer on a variable defined as `extern`, but doing so overrides the `extern`. An `extern` that has an initializer is a definition.
  > 
  > ```c++
  > extern int i;  // declares but does not define i
  > int j;  // declares and defines j
  > extern double pi = 3.1416;  // definition
  > ```
  >
  > <footer>C++ Primer (5th Edition), P76</footer>

1. 
  > Because references are not objects, we may **not** define a reference to a reference.
  > 
  > <footer>C++ Primer (5th Edition), P83</footer>

1. 
  > **References to Pointers**
  >
  > ```c++
  > int i = 42;
  > int *p;  // p is a pointer to int
  > int *&r = p;  // r is a reference to the pointer p
  > r = &i;  // r refers to a pointer; assigning &i to r makes p point to i
  > *r = 0;  // dereferencing r yields i, the object to which p points; changes i to 0
  > ```
  >
  > It can be easier to understand complicated pointer or reference declarations if you read them from **right to left**.
  > 
  > <footer>C++ Primer (5th Edition), P92</footer>

1. 
  > By default, `const` objects are **local** to a file.
  >
  > To define a single instance of a const variable, we use the keyword `extern` on **both** its definition and declaration(s):
  > 
  > ```c++
  > // file_1.cc defines and initializes a const that is accessible to other files
  > extern const int bufSize = fcn();
  > // file_1.h
  > extern const int bufSize;  // same bufSize as defined in file_1.cc
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P94</footer>

1. 
  > When we copy an object, top-level `const` **are** ignored.
  >
  > On the other hand, low-level `const` is **never** ignored.
  > 
  > <footer>C++ Primer (5th Edition), P100</footer>

1. 
  > **`constexpr`**
  >
  > A **constant expression** is an expression whose value cannot change and that can be evaluated at **compile** time. A literal is a constant expression. A const object that is initialized from a constant expression is also a constant expression.
  >
  > Variables declared as `constexpr` are implicitly `const` and must be initialized by constant expressions:
  > 
  > ```c++
  > constexpr int mf = 20;  // 20 is a constant expression
  > constexpr int limit = mf + 1;  // mf + 1 is a constant expression
  > constexpr int sz = size();  // ok only if size is a constexpr function
  > ```
  > 
  > We can initialize a `constexpr` pointer from the `nullptr` literal or the literal (i.e., constant expression) **0**. We can also point to (or bind to) an object that remains at a **fixed** address.
  >
  > It is important to understand that when we define a pointer in a `constexpr` declaration, the `constexpr` specifier applies to the pointer, not the type to which the pointer points:
  > 
  > ```c++
  > const int *p = nullptr;  // p is a pointer to a const int
  > constexpr int *q = nullptr;  // q is a const pointer to int
  > ```
  > 
  > Like any other constant pointer, a `constexpr` pointer may point to a `const` or a non `const` type:
  > 
  > ```c++
  > constexpr int *np = nullptr;  // np is a constant pointer to int that is null
  > int j = 0;
  > constexpr int i = 42;  // type of i is const int
  > // i and j must be defined outside any function
  > constexpr const int *p = &i;  // p is a constant pointer to the const int i
  > constexpr int *p1 = &j;  // p1 is a constant pointer to the int j
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P101-103</footer>

1. 
  > **`typedef`**
  >
  > Declarations that use type aliases that represent compound types and const can yield surprising results.
  > 
  > ```c++
  > typedef char *pstring;
  > const pstring cstr = 0;  // cstr is a constant pointer to char
  > const pstring *ps;  // ps is a pointer to a constant pointer to char
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P104</footer>

1. 
  > `auto` ordinarily **ignores** top-level `const`s.
  > 
  > When we ask for a reference to an `auto`-deduced type, top-level `const`s in the initializer are **not** ignored.
  > 
  > ```c++
  > int i = 0, &r = i;
  > auto a = r;  // a is an int (r is an alias for i, which has type int)
  > const int ci = i, &cr = ci;
  > auto b = ci;  // b is an int (top-level const in ci is dropped)
  > auto c = cr;  // c is an int (cr is an alias for ci whose const is top-level)
  > auto d = &i;  // d is an int*(& of an int object is int*)
  > auto e = &ci;  // e is const int*(& of a const object is low-level const)
  > const auto f = ci;  // deduced type of ci is int; f has type const int
  > auto &g = ci;  // g is a const int& that is bound to ci
  > auto &h = 42;  // error: we can't bind a plain reference to a literal
  > const auto &j = 42;  // ok: we can bind a const reference to a literal
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P106</footer>

1. 
  > **`decltype`**
  >
  > The way `decltype` handles top-level `const` and references differs subtly from the way auto does. When the expression to which we apply `decltype` is a variable, `decltype` returns the type of that variable, **including** top-level `const` and references:
  > 
  > ```c++
  > const int ci = 0, &cj = ci;
  > decltype(ci) x = 0;  // x has type const int
  > decltype(cj) y = x;  // y has type const int& and is bound to x
  > decltype(cj) z;  // error: z is a reference and must be initialized
  > ```
  > 
  > Remember that `decltype((variable))` (note, double parentheses) is always a reference type, but `decltype(variable)` is a reference type only if variable is a reference.
  > 
  > <footer>C++ Primer (5th Edition), P107-108</footer>

1. 
  > **Caution: Subscripts are Unchecked.**
  > 
  > <footer>C++ Primer (5th Edition), P136</footer>

1. 
  > Some compilers may require the old-style declarations for a `vector` of `vector`s, for example, `vector<vector<int> >`.
  > 
  > <footer>C++ Primer (5th Edition), P139</footer>

1. 
  > If we use braces and there is no way to use the initializers to list initialize the object, then those values will be used to **construct** the object.
  > 
  > ```c++
  > vector<string> v5{"hi"};  // list initialization: v5 has one element
  > vector<string> v6("hi");  // error: can't construct a vector from a string literal
  > vector<string> v7{10};  // v7 has ten default-initialized elements
  > vector<string> v8{10, "hi"};  // v8 has ten elements with value "hi"
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P142</footer>

1. 
  > We can also subtract two iterators so long as they refer to elements in, or one off the end of, the same `vector` or `string`. The result is the distance between the iterators. By distance we mean the amount by which we’d have to change one iterator to get the other. The result type is a signed integral type named `difference_type`. Both `vector` and `string` define `difference_type`. This type is signed, because subtraction might have a negative result.
  > 
  > <footer>C++ Primer (5th Edition), P157</footer>

1. 
  > **`begin()`/`end()`**
  >
  > ```c++
  > int ia[] = {0,1,2,3,4,5,6,7,8,9};  // ia is an array of ten ints
  > int *beg = begin(ia);  // pointer to the first element in ia
  > int *last = end(ia);  // pointer one past the last element in ia
  > ```
  > 
  > `begin` returns a pointer to the first, and `end` returns a pointer one past the last element in the given array: These functions are defined in the `iterator` header.
  > 
  > <footer>C++ Primer (5th Edition), P165</footer>

1. 
  > The result of subtracting two pointers is a library type named `ptrdiff_t`. Like `size_t`, the `ptrdiff_t` type is a machine-specific type and is defined in the `cstddef` header.
  > 
  > <footer>C++ Primer (5th Edition), P167</footer>

1. 
  > Unlike subscripts for `vector` and `string`, the index of the built-in subscript operator is **not** an `unsigned` type.
  > 
  > ```c++
  > int *p = &ia[2];  // p points to the element indexed by 2
  > int j = p[1];  // p[1] is equivalent to *(p + 1),
  > // p[1] is the same element as ia[3]
  > int k = p[-2]; //  p[-2] is the same element as ia[0]
  > ```
  > 
  > This last example points out an important difference between arrays and library types such as `vector` and `string` that have subscript operators. The library types force the index used with a subscript to be an unsigned value. The built-in subscript operator **does not**. The index used with the built-in subscript operator can be a negative value. Of course, the resulting address must point to an element in (or one past the end of) the array to which the original pointer points.
  > 
  > <footer>C++ Primer (5th Edition), P169</footer>

1. 
  > To use a multidimensional array in a range `for`, the loop control variable for all but the innermost array **must** be references.
  > 
  > As an example, consider the following loop:
  > 
  > ```c++
  > for (const auto &row : ia)  // for every element in the outer array
  >     for (auto col : row)  // for every element in the inner array
  >         cout << col << endl;
  > ```
  > 
  > This loop does not write to the elements, yet we still define the control variable of the outer loop as a reference. We do so in order to avoid the normal array to pointer conversion. Had we neglected the reference and written these loops as:
  > 
  > ```c++
  > for (auto row : ia)
  >     for (auto col : row)
  > ```
  > 
  > our program would not compile. As before, the first `for` iterates through `ia`, whose elements are arrays of size 4\. Because `row` is not a reference, when the compiler initializes `row` it will convert each array element (like any other object of array type) to a pointer to that array’s first element. As a result, in this loop the type of `row` is `int*`. The inner `for` loop is illegal. Despite our intentions, that loop attempts to iterate over an `int*`.
  > 
  > <footer>C++ Primer (5th Edition), P177</footer>

1. 
  > **value initialization:** Initialization in which built-in types are initialized to zero and class types are initialized by the class’s default constructor. Objects of a class type can be value initialized only if the class has a default constructor. Used to initialize a container’s elements when a size, but not an element initializer, is specified. Elements are initialized as a copy of this compilergenerated value.
  > 
  > <footer>C++ Primer (5th Edition), P182</footer>

1. 
  > Roughly speaking, when we use an object as an **rvalue**, we use the object’s value (its **contents**). When we use an object as an **lvalue**, we use the object’s identity (its **location** in memory).
  > 
  > <footer>C++ Primer (5th Edition), P185</footer>

1. 
  > Order of operand evaluation is **independent** of precedence and associativity. In an expression such as `f() + g() * h() + j()`:
  >
  > * Precedence guarantees that the results of `g()` and `h()` are multiplied.
  > * Associativity guarantees that the result of `f()` is added to the product of `g()` and `h()` and that the result of that addition is added to the value of `j()`.
  > * There are **no** guarantees as to the order in which these functions are called.
  > 
  > <br>
  > Example:
  > 
  > ```c++
  > int i = 0;
  > cout << i << " " << ++i << endl;  // undefined
  > ```
  > 
  > Because this program is undefined, we cannot draw any conclusions about how it might behave. The compiler might evaluate `++i` before evaluating `i`, in which case the output will be `1 1`. Or the compiler might evaluate `i` first, in which case the output will be `0 1`. Or the compiler might do something else entirely. Because this expression has undefined behavior, the program is in error, regardless of what code the compiler generates.
  > 
  > Another example:
  > 
  > ```c++
  > // the behavior of the following loop is undefined!
  > while (beg != s.end() && !isspace(*beg))
  >     *beg = toupper(*beg++);  // error: this assignment is undefined
  > ```
  > 
  > The problem is that in the revised version, both the left- and right-hand operands to `=` use `beg` and the right-hand operand changes `beg`. The assignment is therefore undefined. The compiler might evaluate this expression as either
  > 
  > ```c++
  > *beg = toupper(*beg);        // execution if left-hand side is evaluated first
  > *(beg + 1) = toupper(*beg);  // execution if right-hand side is evaluated first
  > ```
  > 
  > or it might evaluate it in yet some other way.
  > 
  > <footer>C++ Primer (5th Edition), P188, P202</footer>

1. 
  > The *new standard* requires the quotient to be rounded **toward zero** (i.e., truncated).
  > 
  > Except for the obscure case where `-m` overflows, `(-m)/n` and `m/(-n)` are always equal to `-(m/n)`, `m%(-n)` is equal to `m%n` and `(-m)%n` is equal to `-(m%n)`. More concretely:
  > 
  > ```c++
  >  21 % 6;   /* result is 3 */        21 / 6;   /* result is 3 */
  >  21 % 7;   /* result is 0 */        21 / 7;   /* result is 3 */
  > -21 % -8;  /* result is -5 */      -21 / -8;  /* result is 2 */
  >  21 % -5;  /* result is 1 */        21 / -5;  /* result is -4 */
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P192</footer>

1. 
  > Because there are no guarantees for how the sign bit is handled, we strongly recommend using `unsigned` types with the **bitwise operators**.
  > 
  > <footer>C++ Primer (5th Edition), P206</footer>

1. 
  > The result of `sizeof` is a constant expression of type `size_t`. The operator takes one of two forms:
  > 
  > ```c++
  > sizeof (type)
  > sizeof expr
  > ```
  > 
  > The `sizeof` operator is unusual in that it does **not** evaluate its operand:
  > 
  > ```c++
  > Sales_data data, *p;
  > sizeof(Sales_data);  // size required to hold an object of type Sales_data
  > sizeof data;  // size of data's type, i.e., sizeof(Sales_data)
  > sizeof p;  // size of a pointer
  > sizeof *p;  // size of the type to which p points, i.e., sizeof(Sales_data)
  > sizeof data.revenue;  // size of the type of Sales_data's revenue member
  > sizeof Sales_data::revenue;  // alternative way to get the size of revenue
  > ```
  > 
  > `sizeof` an array is the size of the **entire** array. It is equivalent to taking the `sizeof` the element type times the number of elements in the array. Note that `sizeof` does not convert the array to a pointer.
  > 
  > <footer>C++ Primer (5th Edition), P211</footer>

1. 
  > The result of a comma expression is the value of its **right-hand** expression.
  > 
  > <footer>C++ Primer (5th Edition), P212</footer>

1. 
  > A `const_cast` changes **only** a low-level `const` in its operand:
  > 
  > ```c++
  > const char *pc;
  > char *p = const_cast<char*>(pc);  // ok: but writing through p is undefined
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P219</footer>

1. 
  > An old-style cast has the same behavior as a `const_cast`, a `static_cast`, or a `reinterpret_cast`. When we use an old-style cast where a `static_cast` or a `const_cast` would be legal, the old-style cast does the same conversion as the respective named cast. If neither cast is legal, then an oldstyle cast performs a `reinterpret_cast`. For example:
  > 
  > ```c++
  > char *pc = (char*) ip;  // ip is a pointer to int
  > ```
  > 
  > has the same effect as using a `reinterpret_cast`.
  > 
  > <footer>C++ Primer (5th Edition), P221</footer>

1. 
  > **Dangling `else`**
  >
  > How do we know to which `if` a given `else` belongs?
  > 
  > In C++ the ambiguity is resolved by specifying that each `else` is matched with the **closest** preceding unmatched `if`.
  > 
  > <footer>C++ Primer (5th Edition), P234</footer>

1. 
  > `case` labels must be **integral** constant expressions.
  > 
  > <footer>C++ Primer (5th Edition), P236</footer>

1. 
  > It is **illegal** to jump from a place where a variable with an initializer is out of scope to a place where that variable is in scope:
  > 
  > ```c++
  > case true:
  >     // this switch statement is illegal because these initializations might be bypassed
  >     string file_name;  // error: control bypasses an implicitly initialized variable
  >     int ival = 0;  // error: control bypasses an explicitly initialized variable
  >     int jval;  // ok: because jval is not initialized
  >     break;
  > case false:
  >     // ok: jval is in scope but is uninitialized
  >     jval = next_num();  // ok: assign a value to jval
  >     if (file_name.empty())  // file_name is in scope but wasn't initialized
  > ```
  > 
  > If this code were legal, then any time control jumped to the `false` case, it would bypass the initialization of `file_name` and `ival`. Those variables would be in scope. Code following `false` could use those variables. However, these variables would not have been initialized. As a result, the language does not allow us to jump over an initialization if the initialized variable is in scope at the point to which control transfers.
  > 
  > <footer>C++ Primer (5th Edition), P239</footer>

1. 
  > A range `for` is defined in terms of the equivalent traditional for:
  > 
  > ```c++
  > for (auto beg = v.begin(), end = v.end(); beg != end; ++beg) {
  >     auto &r = *beg;  // r must be a reference so we can change the element
  >     r *= 2;  // double the value of each element in v
  > }
  > ```
  > 
  > Now that we know how a range `for` works, we can understand why we said that we cannot use a range `for` to add elements to a vector (or other container). In a range `for`, the value of `end()` is **cached**. If we add elements to (or remove them from) the sequence, the value of `end` might be invalidated.
  > 
  > <footer>C++ Primer (5th Edition), P246</footer>

1. 
  > Because the condition is not evaluated until after the statement or block is executed, the `do while` loop **does not** allow variable definitions inside the condition:
  > 
  > ```c++
  > do {
  >     // . . .
  >     mumble(foo);
  > } while (int foo = get_foo());  // error: declaration in a do condition
  > ```
  > 
  > If we could define variables in the condition, then any use of the variable would happen **before** the variable was defined!
  > 
  > <footer>C++ Primer (5th Edition), P247</footer>

1. 
  > **Arguments** are the initializers for a function’s **parameters**.
  > 
  > <footer>C++ Primer (5th Edition), P262</footer>

1. 
  > Objects that exist only while a block is executing are known as **automatic objects**.
  > 
  > <footer>C++ Primer (5th Edition), P264</footer>

1. 
  > **Exercise 6.24:** Explain the behavior of the following function. If there are problems in the code, explain what they are and how you might fix them. [[Answer]](https://github.com/Mooophy/Cpp-Primer/tree/master/ch06#exercise-624)
  > 
  > ```c++
  > void print(const int ia[10])
  > {
  >     for (size_t i = 0; i != 10; ++i)
  >         cout << ia[i] << endl;
  > }
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P280</footer>

1. 
  > **Ellipsis parameters** are in C++ to allow programs to interface to C code that uses a C library facility named `varargs`. Generally an ellipsis parameter should not be used C++ Primer, Fifth Edition for other purposes. Your C compiler documentation will describe how to use `varargs`.
  > 
  > Ellipsis parameters should be usedi **only** for types that are common to both C and C++. In particular, objects of most class types are not copied properly when passed to an ellipsis parameter.
  > 
  > <footer>C++ Primer (5th Edition), P284</footer>

1. 
  > Never return a reference or pointer to a local object:
  > 
  > ```c++
  > // disaster: this function returns a reference to a local object
  > const string &manip()
  > {
  >     string ret;
  >     // transform ret in some way
  >     if (!ret.empty())
  >         return ret;      // WRONG: returning a reference to a local object!
  >     else
  >         return "Empty";  // WRONG: "Empty" is a local temporary string
  > }
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P287</footer>

1. 
  > Declaring a function that returns a pointer to an array:
  > 
  > ```c++
  > Type (*function(parameter_list))[dimension]
  > ```
  > 
  > or use **trailing return type**. A trailing return type follows the parameter list and is preceded by `->`. To signal that the return follows the parameter list, we use `auto` where the return type ordinarily appears:
  > 
  > ```c++
  > // fcn takes an int argument and returns a pointer to an array of ten ints
  > auto func(int i) -> int(*)[10];
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P291</footer>

1. 
  > The `inline` specification is only a request to the compiler. The compiler may choose to ignore this request.
  > 
  > <footer>C++ Primer (5th Edition), P303</footer>

1. 
  > **`constexpr` function**
  > 
  > The compiler will replace a call to a `constexpr` function with its resulting value. In order to be able to expand the function immediately, `constexpr` functions are implicitly `inline`.
  > 
  > <footer>C++ Primer (5th Edition), P304</footer>

1. 
  > **Put `inline` and `constexpr` functions in header files**
  > 
  > Unlike other functions, `inline` and `constexpr` functions may be defined multiple times in the program. After all, the compiler **needs the definition**, not just the declaration, in order to expand the code. However, all of the definitions of a given `inline` or `constexpr` must match exactly. As a result, `inline` and `constexpr` functions normally are defined in headers.
  > 
  > <footer>C++ Primer (5th Edition), P305</footer>

1. 
  > **Preprocessor Macros**
  >
  > `__func__` string literal containing the name of the current function.
  > 
  > `__FILE__` string literal containing the name of the file.
  > 
  > `__LINE__` integer literal containing the current line number.
  > 
  > `__TIME__` string literal containing the time the file was compiled.
  > 
  > `__DATE__` string literal containing the date the file was compiled.
  > 
  > <footer>C++ Primer (5th Edition), P307</footer>

1. 
  > **Pointers to Functions**
  > 
  > ```c++
  > // pf points to a function returning bool that takes two const string references
  > bool (*pf)(const string &, const string &);  // uninitialized
  > ```
  > 
  > The parentheses around `*pf` are necessary. If we omit the parentheses, then we declare `pf` as a function that returns a pointer to `bool`:
  > 
  > ```c++
  > // declares a function named pf that returns a bool*
  > bool *pf(const string &, const string &);
  > ```
  > 
  > Usage:
  > 
  > ```c++
  > pf = lengthCompare;   // pf now points to the function named lengthCompare
  > pf = &lengthCompare;  // equivalent assignment: address-of operator is optional
  > 
  > bool b1 = pf("hello", "goodbye");             // calls lengthCompare
  > bool b2 = (*pf)("hello", "goodbye");          // equivalent call
  > bool b3 = lengthCompare("hello", "goodbye");  // equivalent call
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P313-314</footer>

1. 
  > **Functions returning a pointer to function**
  >
  > ```c++
  > int (*f1(int))(int*, int);
  > ```
  > 
  > or use trailing return:
  > 
  > ```c++
  > auto f1(int) -> int (*)(int*, int);
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P316</footer>

1. 
  > Functions defined in the class are implicitly `inline`.
  > 
  > <footer>C++ Primer (5th Edition), P324</footer>

1. 
  > The `this` parameter is defined for us implicitly. Indeed, it is illegal for us to define a parameter or variable named `this`. Inside the body of a member function, we can use `this`. It would be legal, although unnecessary, to define `isbn` as
  > 
  > ```c++
  > std::string isbn() const { return this->bookNo; }
  > ```
  > 
  > Because `this` is intended to always refer to “this” object, `this` is a `const` pointer. We cannot change the address that `this` holds.
  > 
  > <footer>C++ Primer (5th Edition), P326</footer>

1. 
  > **`const` member functions**
  > 
  > By default, the type of `this` is a `const` pointer to the non`const` version of the class type. For example, by default, the type of `this` in a `Sales_data` member function is `Sales_data *const`. Although `this` is implicit, it follows the normal initialization rules, which means that (by default) we cannot bind `this` to a `const` object. This fact, in turn, means that we cannot call an ordinary member function on a `const` object.
  > 
  > `this` is implicit and does not appear in the parameter list. There is no place to indicate that `this` should be a pointer to const. The language resolves this problem by letting us put `const` after the parameter list of a member function. A `const` following the parameter list indicates that this is a pointer to `const`. Member functions that use `const` in this way are **`const` member functions**.
  > 
  > <footer>C++ Primer (5th Edition), P326</footer>

1. 
  > Unlike other member functions, constructors may not be declared as `const`. When we create a `const` object of a class type, the object does not assume its “constness” until after the constructor completes the object’s initialization. Thus, constructors can write to `const` objects during their construction.
  > 
  > <footer>C++ Primer (5th Edition), P331</footer>

1. 
  > The compiler-generated constructor is known as the **synthesized default constructor**. For most classes, this synthesized constructor initializes each data member of the class as follows:
  > 
  > * If there is an in-class initializer, use it to initialize the member.
  > * Otherwise, default-initialize the member.
  >
  > <br> 
  > **Note:** The compiler generates a default constructor automatically only if a class declares **no** constructors.
  > 
  > <footer>C++ Primer (5th Edition), P332</footer>

1. 
  > **`= default`**
  >
  > ```c++
  > struct Sales_data {
  >     Sales_data() = default;
  > }
  > ```
  > 
  > Under the *new standard*, if we want the default behavior, we can ask the compiler to generate the constructor for us by writing `= default` after the parameter list. The `= default` can appear with the declaration inside the class body or on the definition outside the class body. Like any other function, if the `= default` appears inside the class body, the default constructor will be inlined; if it appears on the definition outside the class, the member will not be inlined by default.
  > 
  > <footer>C++ Primer (5th Edition), P334</footer>

1. 
  > A `const` member function that returns `*this` as a reference should have a return type that is a reference to `const`.
  > 
  > <footer>C++ Primer (5th Edition), P347</footer>

1. 
  > Just as we can declare a function apart from its definition, we can also declare a class without defining it:
  > 
  > ```c++
  > class Screen;  // declaration of the Screen class
  > ```
  > 
  > This declaration, sometimes referred to as a **forward declaration**, introduces the name `Screen` into the program and indicates that `Screen` refers to a class type. After a declaration and before a definition is seen, the type `Screen` is an **incomplete type**—it’s known that `Screen` is a class type but not known what members that type contains.
  > 
  > We can use an incomplete type in only limited ways: We can define pointers or references to such types, and we can declare (but not define) functions that use an incomplete type as a parameter or return type.
  > 
  > With **one exception**, data members can be specified to be of a class type only if the class has been defined. The type must be complete because the compiler needs to know how much storage the data member requires. Because a class is not defined until its class body is complete, a class cannot have data members of its own type. However, a class is considered declared (but not yet defined) as soon as its class name has been seen. Therefore, a class can have data members that are pointers or references to its own type:
  > 
  > ```c++
  > class Link_screen {
  >     Screen window;
  >     Link_screen *next;
  >     Link_screen *prev;
  > };
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P350</footer>

1. 
  > **Declarations for Friends**
  > 
  > A friend declaration only specifies access. It is not a general declaration of the function. If we want users of the class to be able to call a friend function, then we must also declare the function separately from the friend declaration.
  > 
  > To make a friend visible to users of the class, we usually declare each friend (outside the class) in the same header as the class itself.
  > 
  > Some compilers allow calls to a `friend` function when there is no ordinary declaration for that function. Even if your compiler allows such calls, it is a good idea to provide separate declarations for `friends`. That way you won’t have to change your code if you use a compiler that enforces this rule.
  > 
  > <footer>C++ Primer (5th Edition), P341</footer>
  > <br>
  > 
  > **Friend Declarations and Scope**
  > 
  > Classes and nonmember functions need not have been declared before they are used in a friend declaration. When a name first appears in a friend declaration, that name is implicitly **assumed** to be part of the surrounding scope. However, the friend itself is not actually declared in that scope.
  > 
  > Even if we define the function inside the class, we must still provide a declaration outside of the class itself to make that function visible. A declaration must exist even if we only call the friend from members of the friendship granting class:
  > 
  > ```c++
  > struct X {
  >     friend void f() { /* friend function can be defined in the class body */ }
  >     X() { f(); }  // error: no declaration for f
  >     void g();
  >     void h();
  > };
  > void X::g() { return f(); }  // error: f hasn't been declared
  > void f();  // declares the function defined inside X
  > void X::h() { return f(); }  // ok: declaration for f is now in scope
  > ```
  > 
  > It is important to understand that a friend declaration affects access but is not a declaration in an ordinary sense.
  > 
  > <footer>C++ Primer (5th Edition), P353</footer>

1. 
  > **Scope and Members Defined outside the Class**
  > 
  > ```c++
  > void Window_mgr::clear(ScreenIndex i)
  > {
  >     Screen &s = screens[i];
  >     s.contents = string(s.height * s.width, ' ');
  > }
  > ```
  > 
  > Because the compiler sees the parameter list after noting that we are in the scope of class `WindowMgr`, there is no need to specify that we want the `ScreenIndex` that is defined by `WindowMgr`. For the same reason, the use of `screens` in the function body refers to name declared inside class `Window_mgr`.
  > 
  > On the other hand, the return type of a function normally appears before the function’s name. When a member function is defined outside the class body, any name used in the return type is outside the class scope. As a result, the return type **must** specify the class of which it is a member.
  > 
  > <footer>C++ Primer (5th Edition), P354</footer>

1. 
  > Member function definitions are processed **after** the compiler processes all of the declarations in the class.
  > 
  > <footer>C++ Primer (5th Edition), P356</footer>

1. 
  > **Order of Member Initialization**
  > 
  > Members are initialized in the order in which they appear in the class definition: The first member is initialized first, then the next, and so on. The order in which initializers appear in the constructor initializer list does **not** change the order of initialization.
  > 
  > The order of initialization often doesn’t matter. However, if one member is initialized in terms of another, then the order in which members are initialized is crucially important.
  > 
  > As an example, consider the following class:
  > 
  > ```c++
  > class X {
  >     int i;
  >     int j;
  > public:
  >     // undefined: i is initialized before j
  >     X(int val): j(val), i(j) { }
  > };
  > ```
  > 
  > In this case, the constructor initializer makes it _appear_ as if `j` is initialized with `val` and then `val` is used to initialize `i`. However, `i` is initialized first. The effect of this initializer is to initialize `i` with the undefined value of `j`!
  > 
  > <footer>C++ Primer (5th Edition), P362</footer>

1. 
  > The *new standard* extends the use of constructor initializers to let us define socalled **delegating constructors**. A delegating constructor uses another constructor from its own class to perform its initialization. It is said to “delegate” some (or all) of its work to this other constructor.
  > 
  > ```c++
  > class Sales_data {
  > public:
  >     // nondelegating constructor initializes members from corresponding arguments
  >     Sales_data(std::string s, unsigned cnt, double price):
  >     bookNo(s), units_sold(cnt), revenue(cnt*price) { }
  >     // remaining constructors all delegate to another constructor
  >     Sales_data(): Sales_data("", 0, 0) {}
  >     Sales_data(std::string s): Sales_data(s, 0,0) {}
  >     Sales_data(std::istream &is): Sales_data() { read(is, *this); }
  >     // other members as before
  > };
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P365</footer>

1. 
  > Every constructor that can be called with a single argument defines an implicit conversion to a class type. Such constructors are sometimes referred to as **converting constructors**.
  > 
  > **Only One Class-Type Conversion Is Allowed**
  > 
  > The compiler will automatically apply only one class-type conversion. For example, the following code is in error because it implicitly uses two conversions:
  > 
  > ```c++
  > // error: requires two user-defined conversions:
  > // (1) convert "9-999-99999-9" to string
  > // (2) convert that (temporary) string to Sales_data
  > item.combine("9-999-99999-9");
  > ```
  > 
  > **`explicit` Constructors Can Be Used Only for Direct Initialization**
  > 
  > ```c++
  > Sales_data item1 (null_book);  // ok: direct initialization
  > // error: cannot use the copy form of initialization with an explicit constructor
  > Sales_data item2 = null_book;
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P365</footer>

1. 
  > An **aggregate classes** gives users direct access to its members and has special initialization syntax. A class is an aggregate if
  > 
  > * All of its data members are `public`
  > * It does not define any constructors
  > * It has no in-class initializers
  > * It has no base classes or virtual functions
  > 
  > <br>
  > For example, the following class is an aggregate:
  > 
  > ```c++
  > struct Data {
  >     int ival;
  >     string s;
  > };
  > ```
  > 
  > We can initialize the data members of an aggregate class by providing a braced list of member initializers:
  > 
  > ```c++
  > // val1.ival = 0; val1.s = string("Anna")
  > Data val1 = { 0, "Anna" };
  > ```
  > 
  > The initializers must appear in declaration order of the data members.
  > 
  > <footer>C++ Primer (5th Edition), P372</footer>

1. 
  > **Literal Classes**
  > 
  > We noted that the parameters and return type of a `constexpr` function must be literal types. In addition to the arithmetic types, references, and pointers, certain classes are also literal types. Unlike other classes, classes that are literal types may have function members that are `constexpr`. Such members must meet all the requirements of a `constexpr` function. These member functions are **implicitly** `const`.
  > 
  > ```c++
  > class Debug {
  > public:
  >     constexpr Debug(bool b = true): hw(b), io(b), other(b) { }
  >     constexpr Debug(bool h, bool i, bool o):
  >         hw(h), io(i), other(o) { }
  >     constexpr bool any() { return hw || io || other; }
  >     void set_io(bool b) { io = b; }
  >     void set_hw(bool b) { hw = b; }
  >     void set_other(bool b) { hw = b; }
  > private:
  >     bool hw;  // hardware errors other than IO errors
  >     bool io;  // IO errors
  >     bool other;  // other errors
  > };
  > ```
  >
  > A `constexpr` constructor must initialize every data member. The initializers must either use a `constexpr` constructor or be a constant expression.
  >
  > A `constexpr` constructor is used to generate objects that are `constexpr` and for parameters or return types in `constexpr` functions:
  >
  > ```c++
  > constexpr Debug io_sub(false, true, false);  // debugging IO
  > if (io_sub.any())  // equivalent to if(true)
  >     cerr << "print appropriate error messages" << endl;
  > constexpr Debug prod(false);  // no debugging during production
  > if (prod.any())  // equivalent to if(false)
  >     cerr << "print an error message" << endl;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P373-374</footer>

1. 
  > Even if a `const static` data member is initialized in the class body, that member ordinarily should be defined outside the class definition.
  >
  > ```c++
  > class Account {
  > public:
  >     static double rate() { return interestRate; }
  >     static void rate(double);
  > private:
  >     static constexpr int period = 30;  // period is a constant expression
  >     double daily_tbl[period];
  > };
  >
  > // definition of a static member with no initializer
  > constexpr int Account::period;  // initializer provided in the class definition
  > ```
  >
  > <footer>C++ Primer (5th Edition), P378</footer>

1. 
  > **Flushing the Output Buffer**
  >
  > ```c++
  > cout << "hi!" << endl;  // writes hi and a newline, then flushes the buffer
  > cout << "hi!" << flush;  // writes hi, then flushes the buffer; adds no data
  > cout << "hi!" << ends;  // writes hi and a null, then flushes the buffer
  > ```
  >
  > If we want to flush after every output, we can use the `unitbuf` manipulator. This manipulator tells the stream to do a flush after every subsequent write. The `nounitbuf` manipulator restores the stream to use normal, system-managed buffer flushing:
  >
  > ```c++
  > cout << unitbuf;  // all writes will be flushed immediately
  > // any output is flushed immediately, no buffering
  > cout << nounitbuf;  // returns to normal buffering
  > ```
  >
  > **Caution: Buffers Are Not Flushed If the Program Crashes**
  >
  > Output buffers are *not* flushed if the program terminates abnormally. When a program crashes, it is likely that data the program wrote may be sitting in an output buffer waiting to be printed.
  >
  > <footer>C++ Primer (5th Edition), P390</footer>

1. 
  > **Tying Input and Output Streams Together**
  >
  > When an input stream is tied to an output stream, any attempt to read the input stream will first flush the buffer associated with the output stream. The library ties `cout` to `cin`, so the statement
  >
  > ```c++
  > cin >> ival;
  > ```
  >
  > causes the buffer associated with `cout` to be flushed.
  >
  > We can tie either an istream or an ostream object to another ostream:
  >
  > ```c++
  > cin.tie(&cout);  // illustration only: the library ties cin and cout for us
  > // old_tie points to the stream (if any) currently tied to cin
  > ostream *old_tie = cin.tie(nullptr);  // cin is no longer tied
  > // ties cin and cerr; not a good idea because cin should be tied to cout
  > cin.tie(&cerr);  // reading cin flushes cerr, not cout
  > cin.tie(old_tie);  // reestablish normal tie between cin and cout
  > ```
  >
  > <footer>C++ Primer (5th Edition), P390-391</footer>

1. 
  > **Deciding Which Sequential Container to Use**
  >
  > There are a few rules of thumb that apply to selecting which container to use:
  >
  > * Unless you have a reason to use another container, use a `vector`.
  > * If your program has lots of small elements and space overhead matters, don’t use `list` or `forward_list`.
  > * If the program requires random access to elements, use a `vector` or a `deque`.
  > * If the program needs to insert or delete elements in the middle of the container, use a `list` or `forward_list`.
  > * If the program needs to insert or delete elements at the front and the back, but not in the middle, use a `deque`.
  > * If the program needs to insert elements in the middle of the container only while reading input, and subsequently needs random access to the elements:
  >   * First, decide whether you actually need to add elements in the middle of a container. It is often easier to append to a `vector` and then call the library sort function to reorder the container when you’re done with input.
  >   * If you must insert into the middle, consider using a `list` for the input phase. Once the input is complete, copy the `list` into a `vector`.
  >
  > <br>
  >
  > <footer>C++ Primer (5th Edition), P404</footer>

1. 
  > **`begin` and `end` Members**
  >
  > ```c++
  > list<string> a = {"Milton", "Shakespeare", "Austen"};
  > auto it1 = a.begin();    // list<string>::iterator
  > auto it2 = a.rbegin();   // list<string>::reverse_iterator
  > auto it3 = a.cbegin();   // list<string>::const_iterator
  > auto it4 = a.crbegin();  // list<string>::const_reverse_iterator
  > ```
  >
  > The functions that do not begin with a `c` are overloaded. That is, there are actually two members named `begin`. One is a `const` member that returns the container’s `const_iterator` type. The other is non`const` and returns the container’s `iterator` type. Similarly for `rbegin`, `end`, and `rend`. When we call one of these members on a non`const` object, we get the version that returns `iterator`. We get a `const` version of the iterators *only* when we call these functions on a `const` object. As with pointers and references to `const`, we can convert a plain `iterator` to the corresponding `const_iterator`, but not vice versa.
  >
  > <footer>C++ Primer (5th Edition), P412</footer>

1. 
  > **Library `array`s Have Fixed Size**
  >
  > Just as the size of a built-in array is part of its type, the size of a library `array` is part of its type. When we define an `array`, in addition to specifying the element type, we also specify the container size:
  >
  > ```c++
  > array<int, 42>     // type is: array that holds 42 ints
  > array<string, 10>  // type is: array that holds 10 strings
  > ```
  >
  > It is worth noting that although we cannot copy or assign objects of built-in array types, there is **no** such restriction on `array`:
  >
  > ```c++
  > int digs[10] = {0,1,2,3,4,5,6,7,8,9};
  > int cpy[10] = digs;  // error: no copy or assignment for built-in arrays
  > array<int, 10> digits = {0,1,2,3,4,5,6,7,8,9};
  > array<int, 10> copy = digits;  // ok: so long as array types match
  > ```
  >
  > As with any container, the initializer must have the same type as the container we are creating. For `array`s, the element type and the size must be the same, because the size of an `array` is part of its type.
  >
  > <footer>C++ Primer (5th Edition), P415</footer>

1. 
  > **Using `swap`**
  >
  > The swap operation exchanges the contents of two containers of the same type. After the call to swap, the elements in the two containers are interchanged:
  >
  > ```c++
  > vector<string> svec1(10);  // vector with ten elements
  > vector<string> svec2(24);  // vector with 24 elements
  > swap(svec1, svec2);
  > ```
  >
  > After the `swap`, `svec1` contains 24 string elements and `svec2` contains ten. With the exception of `array`s, swapping two containers is guaranteed to be fast—the elements themselves are not swapped; internal data structures are swapped.
  >
  > The fact that elements are not moved means that, with the exception of `string`, iterators, references, and pointers into the containers are not invalidated. They refer to the same elements as they did before the swap. However, after the `swap`, those elements are in a different container. For example, had `iter` denoted the `string` at position `svec1[3]` before the `swap`, it will denote the element at position `svec2[3]` after the `swap`. Differently from the containers, a call to `swap` on a `string` may invalidate iterators, references and pointers.
  >
  > Unlike how `swap` behaves for the other containers, swapping two `array`s does exchange the elements. As a result, swapping two `array`s requires time proportional to the number of elements in the `array`.
  >
  > <footer>C++ Primer (5th Edition), P418</footer>

1. 
  > Under the *new standard*, the versions of `insert` that take a count or a range return an iterator to the first element that was inserted. (In prior versions of the library, these operations returned `void`.) If the range is empty, no elements are inserted, and the operation returns its first parameter.
  >
  > <footer>C++ Primer (5th Edition), P424</footer>

1. 
  > **Subscripting and Safe Random Access**
  >
  > If we want to ensure that our index is valid, we can use the `at` member instead. The `at` member acts like the subscript operator, but if the index is invalid, `at` throws an `out_of_range` exception:
  >
  > ```c++
  > vector<string> svec;  // empty vector
  > cout << svec[0];      // run-time error: there are no elements in svec!
  > cout << svec.at(0);   // throws an out_of_range exception
  > ```
  >
  > <footer>C++ Primer (5th Edition), P428</footer>

1. 
  > **Exercise 9.32**
  >
  > In the program below would it be legal to write the call to insert as follows? If not, why not?
  >
  > ```c++
  > iter = vi.insert(iter, *iter++);
  > ```
  >
  > **The order of evaluation of arguments is unspecified.** As a result, after entering function `insert`, `iter` could be its original value or original value + 1 or even anything else, depending on how compiler implemented.
  >
  > <footer>C++ Primer (5th Edition), P437</footer>

1. 
  > **`shrink_to_fit`**
  >
  > Under the *new library*, we can call `shrink_to_fit` to ask a `deque`, `vector`, or `string` to return unneeded memory. This function indicates that we no longer need any excess capacity. However, the implementation is free to ignore this request. There is **no** guarantee that a call to `shrink_to_fit` will return memory.
  >
  > <footer>C++ Primer (5th Edition), P439</footer>

1. 
  > **Exercise 9.42**
  >
  > Given that you want to read a character at a time into a `string`, and you know that you need to read at least 100 characters, how might you improve the performance of your program?
  >
  > Use `reserve(100)`.
  >
  > <footer>C++ Primer (5th Edition), P443</footer>

1. 
  > **Conversions between `string`s and Numbers**
  >
  > The *new standard* introduced several functions that convert between numeric data and library `string`s:
  >
  > ![](/media/cpp_primer_5_tbl_9_16.png)
  >
  > In `string` to numeric data converstions:
  >
  > The first non-whitespace character in the `string` must be a sign (`+` or `-`) or a digit. The `string` can begin with `0x` or `0X` to indicate hexadecimal. For the functions that convert to floating-point the `string` may also start with a decimal point (.) and may contain an `e` or `E` to designate the exponent. For the functions that convert to integral type, depending on the base, the `string` can contain alphabetic characters corresponding to numbers beyond the digit 9.
  >
  > If the `string` can’t be converted to a number, These functions throw an `invalid_argument` exception. If the conversion generates a value that can’t be represented, they throw `out_of_range`.
  >
  > <footer>C++ Primer (5th Edition), P450-451</footer>

1. 
  > An **adaptor** is a general concept in the library. There are container, iterator, and function adaptors. Essentially, an adaptor is a mechanism for making one thing act like another.
  >
  > *Container Adaptors*: `stack`, `queue`, and `priority_queue`.
  >
  > By default both `stack` and `queue` are implemented in terms of `deque`, and a `priority_queue` is implemented on a `vector`.
  >
  > <footer>C++ Primer (5th Edition), P452</footer>

1. 
  > **Lambda Expressions**
  >
  > **Note:** The capture list is used for local non`static` variables only; lambdas can use local `static`s and variables declared outside the function directly.
  >
  > When we define a lambda, the compiler generates a new (unnamed) class type that corresponds to that lambda. For now, what’s useful to understand is that when we pass a lambda to a function, we are defining both a new type and an object of that type: The argument is an unnamed object of this compiler-generated class type. Similarly, when we use `auto` to define a variable initialized by a lambda, we are defining an object of the type generated from that lambda.
  >
  > By default, the class generated from a lambda contains a data member corresponding to the variables captured by the lambda. Like the data members of any class, the data members of a lambda are initialized when a lambda object is created.
  >
  > **Warning:** When we capture a variable by reference, we must ensure that the variable exists at the time that the lambda executes.
  >
  > <footer>C++ Primer (5th Edition), P477-478</footer>

1. 
  > **Mutable Lambdas**
  >
  > By default, a lambda may not change the value of a variable that it copies by value. If we want to be able to change the value of a captured variable, we must follow the parameter list with the keyword `mutable`. Lambdas that are mutable may not omit the parameter list:
  >
  > ```c++
  > void fcn3()
  > {
  >     size_t v1 = 42;  // local variable
  >     // f can change the value of the variables it captures
  >     auto f = [v1] () mutable { return ++v1; };
  >     v1 = 0;
  >     auto j = f();  // j is 43
  > }
  > ```
  >
  > Whether a variable captured by reference can be changed (as usual) depends only on whether that reference refers to a `const` or non`const` type:
  >
  > ```c++
  > void fcn4()
  > {
  >     size_t v1 = 42;  // local variable
  >     // v1 is a reference to a non const variable
  >     // we can change that variable through the reference inside f2
  >     auto f2 = [&v1] { return ++v1; };
  >     v1 = 0;
  >     auto j = f2();  // j is 1
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P482</footer>

1. 
  > **Specifying the Lambda Return Type**
  >
  > By default, if a lambda body contains any statements other than a `return`, that lambda is assumed to return `void`.
  >
  > ```c++
  > // error: cannot deduce the return type for the lambda
  > transform(vi.begin(), vi.end(), vi.begin(),
  >           [](int i) { if (i < 0) return -i; else return i; });
  > ```
  >
  > This version of our lambda infers the return type as `void` but we returned a value. When we need to define a return type for a lambda, we must use a **trailing return type**:
  >
  > ```c++
  > transform(vi.begin(), vi.end(), vi.begin(),
  >           [](int i) -> int { if (i < 0) return -i; else return i; });
  > ```
  >
  > <footer>C++ Primer (5th Edition), P482-483</footer>

1. 
  > **The Library `bind` Function**
  >
  > The general form of a call to bind is:
  >
  > ```c++
  > auto newCallable = bind(callable, arg_list);
  > ```
  >
  > where `newCallable` is itself a callable object and `arg_list` is a comma-separated list of arguments that correspond to the parameters of the given callable. That is, when we call `newCallable`, `newCallable` calls `callable`, passing the arguments in `arg_list`.
  >
  > The arguments in `arg_list` may include names of the form `_n`, where `n` is an
integer. These arguments are “placeholders” representing the parameters of
`newCallable`. They stand “in place of” the arguments that will be passed to
`newCallable`. The number n is the position of the parameter in the generated
callable: `_1` is the first parameter in `newCallable`, `_2` is the second, and so forth.
  >
  > Using `bind`, we can replace our original lambda-based call to `find_if`:
  >
  > ```c++
  > auto wc = find_if(words.begin(), words.end(), [sz](const string &a)
  > ```
  >
  > with a version that uses `check_size`:
  >
  > ```c++
  > auto wc = find_if(words.begin(), words.end(), bind(check_size, _1, sz));
  > ```
  >
  > **Using `placeholders` Names**
  >
  > ```c++
  > using std::placeholders::_1;
  > ```
  >
  > **Binding Reference Parameters**
  >
  > If we want to pass an object to bind without copying it, we must use the library `ref` function:
  >
  > ```c++
  > for_each(words.begin(), words.end(), bind(print, ref(os), _1, ' '));
  > ```
  >
  > <footer>C++ Primer (5th Edition), P484-488</footer>

1. 
  > **Insert Iterators**
  >
  > * `back_inserter` creates an iterator that uses `push_back`.
  > * `front_inserter` creates an iterator that uses `push_front`.
  > * `inserter` creates an iterator that uses `insert`. This function takes a second argument, which must be an iterator into the given container. Elements are inserted ahead of the element denoted by the given iterator.
  >
  > <br>
  > It is important to understand that when we call `inserter(c, iter)`, we get an iterator that, when used successively, inserts elements ahead of the element **originally** denoted by `iter`. That is, if `it` is an iterator generated by `inserter`, then an assignment such as
  >
  > ```c++
  > *it = val;
  > ```
  >
  > behaves as
  > 
  > ```c++
  > it = c.insert(it, val);  // it points to the newly added element
  > ++it;   // increment it so that it denotes the same element as before
  > ```
  >
  > <footer>C++ Primer (5th Edition), P489</footer>

1. 
  > **`iostream` Iterators**
  >
  > ![](/media/cpp_primer_5_tbl_10_3.png)
  >
  > ![](/media/cpp_primer_5_tbl_10_4.png)
  >
  > What is more useful is that we can rewrite this program as
  > 
  > ```c++
  > istream_iterator<int> in_iter(cin), eof;  // read ints from cin
  > vector<int> vec(in_iter, eof);  // construct vec from an iterator range
  > ```
  >
  > Rather than writing the loop ourselves, we can more easily print the elements in `vec` by calling `copy`:
  >
  > ```c++
  > ostream_iterator<int> out_iter(cout, " ");
  > copy(vec.begin(), vec.end(), out_iter);
  > cout << endl;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P491-494</footer>

1. 
  > **`reverse_iterator`’s `base` member**
  >
  > ```c++
  > // find the last element in a comma-separated list
  > auto rcomma = find(line.crbegin(), line.crend(), ',');
  >
  > // WRONG: will generate the word in reverse order
  > cout << string(line.crbegin(), rcomma) << endl;
  >
  > // ok: get a forward iterator and read to the end of line
  > cout << string(rcomma.base(), line.cend()) << endl;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P497</footer>

1. 
  > **Iterator Categories**
  >
  > ![](/media/cpp_primer_5_tbl_10_5.png)
  >
  > <footer>C++ Primer (5th Edition), P499</footer>

1. 
  > **Container-Specific Algorithms**
  >
  > ![](/media/cpp_primer_5_tbl_10_6.png)
  >
  > The list member versions should be used **in preference** to the generic algorithms for `list`s and `forward_list`s.
  > 
  > <footer>C++ Primer (5th Edition), P505</footer>
 
1. 
  > **The `splice` Members**
  >
  > ![](/media/cpp_primer_5_tbl_10_7.png)
  > 
  > <footer>C++ Primer (5th Edition), P506</footer>

1. 
  > **Key Types for Ordered Containers**
  >
  > Just as we can provide our own comparison operation to an algorithm, we can also supply our own operation to use in place of the `<` operator on keys. The specified operation must define a **strict weak ordering** over the key type.
  >
  > <footer>C++ Primer (5th Edition), P515</footer>
 
1. 
  > **Iterators for `set`s Are `const`**
  >
  > Although the `set` types define both the `iterator` and `const_iterator` types, both types of iterators give us read-only access to the elements in the `set`. Just as we cannot change the key part of a `map` element, the keys in a `set` are also `const`. We can use a `set` iterator to read, but not write, an element’s value.
  >
  > <footer>C++ Primer (5th Edition), P520</footer>

1. 
  > Subscripting a `map` behaves quite differently from subscripting an array or `vector`: Using a key that is not already present **adds** an element with that key to the `map`.
  >
  > <footer>C++ Primer (5th Edition), P528</footer>

1. 
  > We can also value initialize a dynamically allocated object by following the type name with a pair of empty parentheses:
  >
  > ```c++
  > string *ps1 = new string;   // default initialized to the empty string
  > string *ps = new string();  // value initialized to the empty string
  > int *pi1 = new int;         // default initialized; *pi1 is undefined
  > int *pi2 = new int();       // value initialized to 0; *pi2 is 0
  > ```
  >
  > <footer>C++ Primer (5th Edition), P553</footer>

1. 
  > When we provide an initializer inside parentheses, we can use `auto` to deduce the type of the object we want to allocate from that initializer. However, because the compiler uses the initializer’s type to deduce the type to allocate, we can use `auto` only with a single initializer inside parentheses:
  >
  > ```c++
  > auto p1 = new auto(obj);    // p points to an object of the type of obj
  >                             // that object is initialized from obj
  > auto p2 = new auto{a,b,c};  // error: must use parentheses for the initializer
  > ```
  >
  > <footer>C++ Primer (5th Edition), P553</footer>

1. 
  > After the `delete`, the pointer becomes what is referred to as a **dangling pointer**. A dangling pointer is one that refers to memory that once held an object but no longer does so.
  >
  > <footer>C++ Primer (5th Edition), P557</footer>

96.  
  > It is important to remember that what we call a dynamic array does **not** have an array type.
  >
  > Because the allocated memory does not have an array type, we cannot call `begin` or `end` on a dynamic array. These functions use the array dimension (which is part of an array’s type) to return pointers to the first and one past the last elements, respectively. For the same reasons, we also cannot use a range `for` to process the elements in a (so-called) dynamic array.
  >
  > <footer>C++ Primer (5th Edition), P574</footer>

97.  
  > When we use `new` to allocate an array of size zero, `new` returns a valid, nonzero pointer. That pointer is guaranteed to be distinct from any other pointer returned by `new`. This pointer acts as the off-the-end pointer for a zero-element array. We can use this pointer in ways that we use an off-the-end iterator. The pointer can be compared as in the loop above. We can add zero to (or subtract zero from) such a pointer and can subtract the pointer from itself, yielding zero. The pointer cannot be dereferenced—after all, it points to no element.
  >
  > ```c++
  > char arr[0];             // error: cannot define a zero-length array
  > char *cp = new char[0];  // ok: but cp can't be dereferenced
  > ```
  >
  > <footer>C++ Primer (5th Edition), P575-576</footer>

1. 
  > Elements in an array are destroyed in **reverse** order. That is, the last element is destroyed first, then the second to last, and so on.
  >
  > <footer>C++ Primer (5th Edition), P576</footer>

1. 
  > **Smart Pointers and Dynamic Arrays**
  >
  > The library provides a version of `unique_ptr` that can manage arrays allocated by `new`.
  >
  > Unlike `unique_ptr`, `shared_ptrs` provide no direct support for managing a dynamic array. If we want to use a `shared_ptr` to manage a dynamic array, we must provide our own deleter.
  >
  > The fact that `shared_ptr` does not directly support managing arrays affects how we access the elements in the array:
  >
  > ```c++
  > // shared_ptrs don't have subscript operator and don't support pointer arithmetic
  > for (size_t i = 0; i != 10; ++i)
  >     *(sp.get() + i) = i;  // use get to get a built-in pointer
  > ```
  >
  > <footer>C++ Primer (5th Edition), P577-578</footer>

1. 
  > **free store** Memory pool available to a program to hold dynamically allocated objects.
  >
  > **heap** Synonym for free store.
  >
  > <footer>C++ Primer (5th Edition), P590</footer>

1. 
  > Although we cannot directly copy an array, the synthesized **copy constructor** and **copy-assignment operator** copies members of array type by copying each element.
  >
  > <footer>C++ Primer (5th Edition), P594-595, 599</footer>

1. 
  > **Copy initialization** happens not only when we define variables using an `=`, but also when we
  >
  > * Pass an object as an argument to a parameter of nonreference type
  > * Return an object from a function that has a nonreference return type
  > * Brace initialize the elements in an array or the members of an aggregate class
  >
  > <br>
  > <footer>C++ Primer (5th Edition), P594-595</footer>

1. 
  > The fact that the copy constructor is used to initialize nonreference parameters of class type explains why the copy constructor’s own parameter must be a reference. If that parameter were not a reference, then the call would never succeed—to call the copy constructor, we’d need to use the copy constructor to copy the argument, but to copy the argument, we’d need to call the copy constructor, and so on indefinitely.
  >
  > <footer>C++ Primer (5th Edition), P596</footer>

1. 
  > In a destructor, the function body is executed first and then the members are destroyed. Members are destroyed in *reverse* order from the order in which they were initialized.
  >
  > <footer>C++ Primer (5th Edition), P600</footer>

1. 
  > **The Rule of Three/Five**
  >
  > * Classes that need destructors need copy and assignment
  > * Classes that need copy need assignment, and vice versa
  >
  > <br>
  > **Advice: Updating the Rule of Three**
  >
  > All five copy-control members should be thought of as a unit: Ordinarily, if a class defines any of these operations, it usually should define them all. As we’ve seen, some classes *must* define the copy constructor, copy-assignment operator, and destructor to work correctly. Such classes typically have a resource that the copy members must copy. Ordinarily, copying a resource entails some amount of overhead. Classes that define the move constructor and move-assignment operator can avoid this overhead in those circumstances where a copy isn’t necessary.
  >
  > <footer>C++ Primer (5th Edition), P603-604, 645</footer>

1. 
  > **Using `= default`**
  >
  > We can explicitly ask the compiler to generate the synthesized versions of the copy-control members by defining them as `= default`:
  >
  > ```c++
  > class Sales_data {
  > public:
  >     // copy control; use defaults
  >     Sales_data() = default;
  >     Sales_data(const Sales_data&) = default;
  >     Sales_data& operator=(const Sales_data &);
  >     ~Sales_data() = default;
  >     // other members as before
  > };
  > Sales_data& Sales_data::operator=(const Sales_data&) = default;
  > ```
  >
  > When we specify `= default` on the declaration of the member inside the class body, the synthesized function is implicitly inline (just as is any other member function defined in the body of the class). If we do not want the synthesized member to be an inline function, we can specify `= default` on the member’s definition, as we do in the definition of the copy-assignment operator.
  >
  > <footer>C++ Primer (5th Edition), P606</footer>

1. 
  > **Defining a Function as Deleted**
  >
  > Under the *new standard*, we can prevent copies by defining the copy constructor and copy-assignment operator as **deleted functions**.
  >
  > ```c++
  > struct NoCopy {
  >     NoCopy() = default;  // use the synthesized default constructor
  >     NoCopy(const NoCopy&) = delete;  // no copy
  >     NoCopy &operator=(const NoCopy&) = delete;  // no assignment
  >     ~NoCopy() = default;  // use the synthesized destructor
  >     // other members
  > };
  > ```
  >
  > Unlike `= default`, `= delete` must appear on the first declaration of a deleted function.
  >
  > Also unlike `= default`, we can specify `= delete` on any function (we can use `= default` only on the default constructor or a copy-control member that the compiler can synthesize). Although the primary use of deleted functions is to suppress the copy-control members, deleted functions are sometimes also useful when we want to guide the function-matching process.
  >
  > **The Destructor *Should Not* be a Deleted Member**
  >
  > <footer>C++ Primer (5th Edition), P607</footer>

1. 
  > **`allocator` Algorithms**
  >
  > ![](/media/cpp_primer_5_tbl_12_8.png)
  >
  > <footer>C++ Primer (5th Edition), P582</footer>

1. 
  > **copy and swap**
  >
  > ```c++
  > // note rhs is passed by value, which means the HasPtr copy constructor
  > // copies the string in the right-hand operand into rhs
  > HasPtr& HasPtr::operator=(HasPtr rhs)
  > {
  >     // swap the contents of the left-hand operand with the local variable rhs
  >     swap(*this, rhs);  // rhs now points to the memory this object had used
  >     return *this;      // rhs is destroyed, which deletes the pointer in rhs
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P619-620</footer>

1. 
  > The compiler will synthesize a move constructor or a move-assignment operator *only* if the class doesn’t define any of its own copy-control members and if every non`static` data member of the class can be moved.
  >
  > <footer>C++ Primer (5th Edition), P641</footer>

1. 
  > Unlike the copy operations, a move operation is never implicitly defined as a deleted function. However, if we explicitly ask the compiler to generate a move operation by using `= default`, and the compiler is unable to move all the members, then the move operation will be defined as deleted.
  >
  > <footer>C++ Primer (5th Edition), P642</footer>

1. 
  > Classes that define a move constructor or move-assignment operator must also define their own copy operations. Otherwise, those members are deleted by default.
  >
  > <footer>C++ Primer (5th Edition), P643</footer>

1. 
  > **Copy-and-Swap Assignment Operators and Move**
  >
  > The version of our `HasPtr` class that defined a copy-and-swap assignment operator is a good illustration of the interaction between function matching and move operations. If we add a move constructor to this class, it will effectively get a move assignment operator as well:
  >
  > ```c++
  > class HasPtr {
  > public:
  >     // added move constructor
  >     HasPtr(HasPtr &&p) noexcept : ps(p.ps), i(p.i) {p.ps = 0;}
  >     // assignment operator is both the move- and copy-assignment operator
  >     HasPtr& operator=(HasPtr rhs) { swap(*this, rhs); return *this; }
  >     // other members as in § 13.2.1 (p. 511)
  > };
  > ```
  >
  > Now let’s look at the assignment operator. That operator has a nonreference parameter, which means the parameter is copy initialized. Depending on the type of the argument, copy initialization uses either the copy constructor or the move constructor; lvalues are copied and rvalues are moved. As a result, this single assignment operator acts as *both* the copy-assignment and move-assignment operator.
  >
  > <footer>C++ Primer (5th Edition), P644-645</footer>

1. 
  > The *new library* defines a **move iterator** adaptor. A move iterator adapts its given iterator by changing the behavior of the iterator’s dereference operator. Ordinarily, an iterator dereference operator returns an lvalue reference to the element. Unlike other iterators, the dereference operator of a move iterator yields an rvalue reference.
  >
  > We transform an ordinary iterator to a move iterator by calling the library `make_move_iterator` function. This function takes an iterator and returns a move iterator.
  >
  > All of the original iterator’s other operations work as usual. Because these iterators support normal iterator operations, we can pass a pair of move iterators to an algorithm. In particular, we can pass move iterators to `uninitialized_copy`:
  >
  > ```c++
  > void StrVec::reallocate()
  > {
  >     // allocate space for twice as many elements as the current size
  >     auto newcapacity = size() ? 2 * size() : 1;
  >     auto first = alloc.allocate(newcapacity);
  >     // move the elements
  >     auto last = uninitialized_copy(make_move_iterator(begin()),
  >                                    make_move_iterator(end()),
  >                                    first);
  >     free();            // free the old space
  >     elements = first;  // update the pointers
  >     first_free = last;
  >     cap = elements + newcapacity;
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P647-648</footer>

1. 
  > Outside of class implementation code such as move constructors or move-assignment operators, use `std::move` only when you are certain that you need to do a move and that the move is guaranteed to be safe.
  >
  > <footer>C++ Primer (5th Edition), P648</footer>

1. 
  > We indicate the lvalue/rvalue property of `this` in the same way that we define `const` member functions; we place a **reference qualifier** after the parameter list:
  >
  > ```c++
  > class Foo {
  > public:
  >     Foo &operator=(const Foo&) &;  // may assign only to modifiable lvalues
  >     // other members of Foo
  > };
  > Foo &Foo::operator=(const Foo &rhs) &
  > {
  >     // do whatever is needed to assign rhs to this object
  >     return *this;
  > }
  > ```
  >
  > The reference qualifier can be either `&` or `&&`, indicating that `this` may point to an rvalue or lvalue, respectively.
  >
  > <footer>C++ Primer (5th Edition), P651</footer>

1. 
  > When we define `const` memeber functions, we can define two versions that differ only in that one is `const` qualified and the other is not. There is no similar default for reference qualified functions. When we define two or more members that have the same name and the same parameter list, we must provide a reference qualifier on all or none of those functions:
  >
  > ```c++
  > class Foo {
  > public:
  >     Foo sorted() &&;
  >     Foo sorted() const;  // error: must have reference qualifier
  >     // Comp is type alias for the function type (see § 6.7 (p. 249))
  >     // that can be used to compare int values
  >     using Comp = bool(const int&, const int&);
  >     Foo sorted(Comp*);        // ok: different parameter list
  >     Foo sorted(Comp*) const;  // ok: neither version is reference qualified
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P651-652</footer>

1. 
  > Ordinarily, the comma, address-of, logical AND, and logical OR operators should *not* be overloaded.
  >
  > <footer>C++ Primer (5th Edition), P660</footer>

1. 
  > The assignment (`=`), subscript (`[]`), call (`()`), and member access arrow (`->`) operators must be defined as members.
  >
  > <footer>C++ Primer (5th Edition), P661</footer>

1. 
  > Input operators *should* decide what, if anything, to do about error recovery.
  >
  > <footer>C++ Primer (5th Edition), P667</footer>

1. 
  > Classes that define both an arithmetic operator and the related compound assignment ordinarily ought to implement the arithmetic operator by using the compound assignment.
  >
  > <footer>C++ Primer (5th Edition), P668</footer>

1. 
  > In addition to the copy- and move-assignment operators that assign one object of the class type to another object of the same type, a class can define additional assignment operators that allow other types as the right-hand operand.
  >
  > <footer>C++ Primer (5th Edition), P671</footer>

1. 
  > To solve this problem, the postfix versions take an extra (unused) parameter of type `int`. When we use a postfix operator, the compiler supplies 0 as the argument for this parameter. Although the postfix function can use this extra parameter, it usually should not. That parameter is not needed for the work normally performed by a postfix operator. Its sole purpose is to distinguish a postfix function from the prefix version.
  >
  > ```c++
  > class StrBlobPtr {
  > public:
  >     // increment and decrement
  >     StrBlobPtr operator++(int);  // postfix operators
  >     StrBlobPtr operator--(int);
  >     // other members as before
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P676</footer>

1. 
  > **Member Access Operators**
  >
  > ```c++
  > class StrBlobPtr {
  > public:
  >     std::string& operator*() const
  >     {
  >         auto p = check(curr, "dereference past end");
  >         return (*p)[curr];  // (*p) is the vector to which this object points
  >     }
  >     std::string* operator->() const
  >     {
  >         // delegate the real work to the dereference operator
  >         return & this->operator*();
  >     }
  >     // other members as before
  > };
  > ```
  >
  > It is worth noting that we’ve defined these operators as `const` members. Unlike the increment and decrment operators, fetching an element doesn’t change the state of a `StrBlobPtr`. Also note that these operators return a reference or pointer to non`const` `string`. They do so because we know that a `StrBlobPtr` can only be bound to a non`const` `StrBlob`.
  >
  > When we write `point->mem`, `point` must be a pointer to a class object or it must be an object of a class with an overloaded `operator->`. Depending on the type of `point`, writing `point->mem` is equivalent to
  >
  > ```c++
  > (*point).mem;             // point is a built-in pointer type
  > point.operator->()->mem;  // point is an object of class type
  > ```
  >
  > Otherwise the code is in error. That is, `point->mem` executes as follows:
  >
  > 1. If `point` is a pointer, then the built-in arrow operator is applied, which means this expression is a synonym for `(*point).mem`. The pointer is dereferenced and the indicated member is fetched from the resulting object. If the type pointed to by `point` does not have a member named `mem`, then the code is in error.
  > 2. If `point` is an object of a class that defines `operator->`, then the result of `point.operator->()` is used to fetch `mem`. If that result is a pointer, then step 1 is executed on that pointer. If the result is an object that itself has an overloaded `operator->()`, then this step is repeated on that object. This process continues until either a pointer to an object with the indicated member is returned or some other value is returned, in which case the code is in error.
  >
  > <br>
  > <footer>C++ Primer (5th Edition), P679</footer>

1. 
  > Objects of classes that define the call operator are referred to as **function objects**. Such objects "act like functions" because we can call them.
  >
  > <footer>C++ Primer (5th Edition), P680-681</footer>

1. 
  > One important aspect of these library function objects is that the library guarantees that they will work for pointers. Recall that comparing two unrelated pointers is undefined. However, we might want to `sort` a `vector` of pointers based on their addresses in memory. Although it would be undefined for us to do so directly, we can do so through one of the library function objects:
  >
  > ```c++
  > vector<string *> nameTable;  // vector of pointers
  > // error: the pointers in nameTable are unrelated, so < is undefined
  > sort(nameTable.begin(), nameTable.end(),
  >      [](string *a, string *b) { return a < b; });
  > // ok: library guarantees that less on pointer types is well defined
  > sort(nameTable.begin(), nameTable.end(), less<string*>());
  > ```
  >
  > It is also worth noting that the associative containers use `less<key_type>` to order their elements. As a result, we can define a `set` of pointers or use a pointer as the key in a `map` without specifying `less` directly.
  >
  > <footer>C++ Primer (5th Edition), P685</footer>

1. 
  > **Defining a Class with a Conversion Operator**
  >
  > ```c++
  > class SmallInt {
  > public:
  >     SmallInt(int i = 0): val(i)
  >     {
  >         if (i < 0 || i > 255)
  >         throw std::out_of_range("Bad SmallInt value");
  >     }
  >     operator int() const { return val; }
  > private:
  >     std::size_t val;
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P691</footer>

128.  
  > **Conversion Operators Can Yield Suprising Results**
  >
  > ```c++
  > int i = 42;
  > cin << i; // this code would be legal if the conversion to bool were not explicit!
  > ```
  >
  > Conversion to `bool` is usually intended for use in conditions. As a result, operator `bool` ordinarily should be defined as `explicit`.
  >
  > The exception is that the compiler will apply an `explicit` conversion to an expression used as a condition.
  >
  > <footer>C++ Primer (5th Edition), P692-693</footer>

1. 
  > In a call to an overloaded function, the rank of an additional standard conversion (if any) matters only if the viable functions require the same user-defined conversion. If different user-defined conversions are needed, then the call is ambiguous.
  >
  > <footer>C++ Primer (5th Edition), P699</footer>

130.  
  > **Argument Type Conversions**
  > 
  > 1. An exact match. An exact match happens when:
  >   * The argument and parameter types are identical.
  >   * The argument is converted from an array or function type to the corresponding pointer type.
  >   * A top-level `const` is added to or discarded from the argument.
  > 2. Match through a `const` conversion.
  > 3. Match through a promotion.
  > 4. Match through an arithmetic or pointer conversion.
  > 5. Match through a class-type conversion.
  >
  > <br>
  > <footer>C++ Primer (5th Edition), P311</footer>

1. 
  > If a base class defines a `static` member, there is only one such member defined for the entire hierarchy.
  >
  > <footer>C++ Primer (5th Edition), P712</footer>

1. 
  > A derived class is declared like any other class. The declaration contains the class name but does not include its derivation list:
  >
  > ```c++
  > class Bulk_quote : public Quote;  // error: derivation list can't appear here
  > class Bulk_quote;                 // ok: right way to declare a derived class
  > ```
  >
  > <footer>C++ Primer (5th Edition), P712-713</footer>

133.  
  > Sometimes we define a class that we don’t want others to inherit from. Or we might define a class for which we don’t want to think about whether it is appropriate as a base class. Under the new standard, we can prevent a class from being used as a base by following the class name with `final`:
  >
  > ```c++
  > class NoDerived final { /* */ };    // NoDerived can't be a base class
  > class Base { /* */ };
  > // Last is final; we cannot inherit from Last
  > class Last final : Base { /* */ };  // Last can't be a base class
  > class Bad : NoDerived { /* */ };    // error: NoDerived is final
  > class Bad2 : Last { /* */ };        // error: Last is final
  >```
  >
  > <footer>C++ Primer (5th Edition), P713-714</footer>

1. 
  > When we use types related by inheritance, we often need to distinguish between the **static type** of a variable or other expression and the **dynamic type** of the object that expression represents. The static type of an expression is always known at compile time—it is the type with which a variable is declared or that an expression yields. The dynamic type is the type of the object in memory that the variable or expression represents. The dynamic type may not be known until run time.
  >
  > <footer>C++ Primer (5th Edition), P715</footer>

1. 
  > Under the *new standard* we can specify `override` on a virtual function in a derived class. Doing so makes our intention clear and (more importantly) enlists the compiler in finding such problems for us. The compiler will reject a program if a function marked `override` does not override an existing virtual function:
  >
  > ```c++
  > struct B {
  >     virtual void f1(int) const;
  >     virtual void f2();
  >     void f3();
  > };
  > struct D1 : B {
  >     void f1(int) const override;  // ok: f1 matches f1 in the base
  >     void f2(int) override;        // error: B has no f2(int) function
  >     void f3() override;           // error: f3 not virtual
  >     void f4() override;           // error: B doesn't have a function named f4
  > };
  > ```
  >
  > We can also designate a function as `final`. Any attempt to override a function that has been defined as `final` will be flagged as an error:
  >
  > ```c++
  > struct D2 : B {
  >     // inherits f2() and f3() from B and overrides f1(int)
  >     void f1(int) const final;  // subsequent classes can't override f1 (int)
  > };
  > struct D3 : D2 {
  >     void f2();           // ok: overrides f2 inherited from the indirect base, B
  >     void f1(int) const;  // error: D2 declared f2 as final
  > };
  > ```
  >
  > `final` and `override` specifiers appear after the parameter list (including any `const` or reference qualifiers) and after a trailing return.
  >
  > <footer>C++ Primer (5th Edition), P721</footer>

1. 
  > Like any other function, a virtual function can have default arguments. If a call uses a default argument, the value that is used is the one defined by the *static* type through which the function is called.
  >
  > **Best Practices:** Virtual functions that have default arguments should use the same argument values in the base and derived classes.
  >
  > <footer>C++ Primer (5th Edition), P722</footer>

1. 
  > **Circumventing the Virtual Mechanism**
  >
  > In some cases, we want to prevent dynamic binding of a call to a virtual function; we want to force the call to use a particular version of that virtual. We can use the scope operator to do so. For example, this code:
  >
  > ```c++
  > // calls the version from the base class regardless of the dynamic type of baseP
  > double undiscounted = baseP->Quote::net_price(42);
  > ```
  >
  > Ordinarily, only code inside member functions (or friends) should need to use the scope operator to circumvent the virtual mechanism.
  >
  > If a derived virtual function that intended to call its base-class version omits the scope operator, the call will be resolved at run time as a call to the derived version itself, resulting in an infinite recursion.
  >
  > <footer>C++ Primer (5th Edition), P722-723</footer>

1. 
  > A derived class member or friend may access the `protected` members of the base class *only* through a derived object. The derived class has no special access to the `protected` members of base-class objects.
  > 
  > ```c++
  > class Base {
  > protected:
  >     int prot_mem;  // protected member
  > };
  > class Sneaky : public Base {
  >     friend void clobber(Sneaky&);  // can access Sneaky::prot_mem
  >     friend void clobber(Base&);    // can't access Base::prot_mem
  >     int j;  // j is private by default
  > };
  > // ok: clobber can access the private and protected members in Sneaky objects
  > void clobber(Sneaky &s) { s.j = s.prot_mem = 0; }
  > // error: clobber can't access the protected members in Base
  > void clobber(Base &b) { b.prot_mem = 0; }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P727</footer>

1. 
  > Just as friendship is not transitive, friendship is also *not* inherited. Friends of the base have no special access to members of its derived classes, and friends of a derived class have no special access to the base class:
  >
  > ```c++
  > class Base {
  >     // added friend declaration; other members as before
  >     friend class Pal;  // Pal has no access to classes derived from Base
  > };
  > class Pal {
  > public:
  >     int f(Base b) { return b.prot_mem; }  // ok: Pal is a friend of Base
  >     int f2(Sneaky s) { return s.j; }  // error: Pal not friend of Sneaky
  >     // access to a base class is controlled by the
  >     // base class, even inside a derived object
  >     int f3(Sneaky s) { return s.prot_mem; }  // ok: Pal is a friend
  > };
  > ```
  >
  > When a class makes another class a friend, it is only that class to which friendship is granted. The base classes of, and classes derived from, the friend have no special access to the befriending class:
  >
  > ```c++
  > // D2 has no access to protected or private members in Base
  > class D2 : public Pal {
  > public:
  >     int mem(Base b) { return b.prot_mem; } // error: friendship doesn't inherit
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P730</footer>

1. 
  > **Exempting Individual Members**
  >
  > Sometimes we need to change the access level of a name that a derived class inherits. We can do so by providing a `using` declaration:
  >
  > ```c++
  > class Base {
  > public:
  >     std::size_t size() const { return n; }
  > protected:
  >     std::size_t n;
  > };
  > class Derived : private Base {  // note: private inheritance
  > public:
  >     // maintain access levels for members related to the size of the object
  >     using Base::size;
  > protected:
  >     using Base::n;
  > };
  > ```
  >
  > Because `Derived` uses `private` inheritance, the inherited members, `size` and `n`, are (by default) `private` members of `Derived`. The `using` declarations adjust the accessibility of these members. Users of `Derived` can access the `size` member, and classes subsequently derived from `Derived` can access `n`.
  > 
  > <footer>C++ Primer (5th Edition), P731</footer>

1. 
  > By default, a derived class defined with the `class` keyword has `private` inheritance; a derived class defined with `struct` has `public` inheritance:
  >
  > ```c++
  > class Base { /* ... */ };
  > struct D1 : Base { /* ... */ };  // public inheritance by default
  > class D2 : Base { /* ... */ };   // private inheritance by default
  > ```
  >
  > It is a common misconception to think that there are deeper differences between classes defined using the `struct` keyword and those defined using `class`. The only differences are the default access specifier for members and the default derivation access specifier. There are no other distinctions.
  >
  > <footer>C++ Primer (5th Edition), P732</footer>

1. 
  > For any given point in your code, if a `public` member of the base class would be accessible, then the derived-to-base conversion is also accessible, and not otherwise.
  >
  > <footer>C++ Primer (5th Edition), P729</footer>

1. 
  > **Name Lookup Happens before Type Checking**
  >
  > As we’ve seen, functions declared in an inner scope do not overload functions declared in an outer scope. As a result, functions defined in a derived class do not overload members defined in its base class(es). As in any other scope, if a member in a derived class (i.e., in an inner scope) has the same name as a base-class member (i.e., a name defined in an outer scope), then the derived member hides the base-class member within the scope of the derived class. The base member is hidden even if the functions have different parameter lists:
  >
  > ```c++
  > struct Base {
  >     int memfcn();
  > };
  > struct Derived : Base {
  >     int memfcn(int);  // hides memfcn in the base
  > };
  > Derived d; Base b;
  > b.memfcn();        // calls Base::memfcn
  > d.memfcn(10);      // calls Derived::memfcn
  > d.memfcn();        // error: memfcn with no arguments is hidden
  > d.Base::memfcn();  // ok: calls Base::memfcn
  > ```
  >
  > <footer>C++ Primer (5th Edition), P736</footer>

1. 
  > **Defining a Derived Copy or Move Constructor**
  >
  > ```c++
  > class Base { /* ... */ } ;
  > class D: public Base {
  > public:
  >     // by default, the base class default constructor initializes
  >     // the base part of an object to use the copy or move constructor,
  >     // we must explicitly call that constructor in the constructor initializer list
  >     D(const D& d): Base(d)  // copy the base members
  >     /* initializers for members of D */ { /* ... */ }
  >     D(D&& d): Base(std::move(d))  // move the base members
  >     /* initializers for members of D */ { /* ... */ }
  > };
  > ```
  >
  > Had the initializer for the base class been omitted,
  >
  > ```c++
  > // probably incorrect definition of the D copy constructor
  > // base-class part is default initialized, not copied
  > D(const D& d) /* member initializers, but no base-class initializer */
  >     { /* ... */ }
  > ```
  >
  > the `Base` default constructor would be used to initialize the base part of a `D` object.
  >
  > <footer>C++ Primer (5th Edition), P743-744</footer>

1. 
  > **Derived-Class Assignment Operator**
  >
  > ```c++
  > // Base::operator=(const Base&) is not invoked automatically
  > D &D::operator=(const D &rhs)
  > {
  >     Base::operator=(rhs);  // assigns the base part
  >     // assign the members in the derived class, as usual,
  >     // handling self-assignment and freeing existing resources as appropriate
  >     return *this;
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P744</footer>

1. 
  > **Derived-Class Destructor**
  >
  > Recall that the data members of an object are implicitly destroyed after the destructor body completes. Similarly, the base-class parts of an object are also implicitly destroyed. As a result, unlike the constructors and assignment operators, a derived destructor is responsible only for destroying the resources allocated by the derived class:
  >
  > ```c++
  > class D: public Base {
  > public:
  >     // Base::~Base invoked automatically
  >     ~D() { /* do what it takes to clean up derived members */ }
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P745</footer>

1. 
  > **Calls to Virtuals in Constructors and Destructors**
  >
  > As we’ve seen, the base-class part of a derived object is constructed first. While the base-class constructor is executing, the derived part of the object is uninitialized. Similarly, derived objects are destroyed in reverse order, so that when a base class destructor runs, the derived part has already been destroyed. As a result, while these base-class members are executing, the object is incomplete.
  >
  > To accommodate this incompleteness, the compiler treats the object as if its type changes during construction or destruction. That is, while an object is being constructed it is treated as if it has the same class as the constructor; calls to virtual functions will be bound as if the object has the same type as the constructor itself. Similarly, for destructors. This binding applies to virtuals called directly or that are called indirectly from a function that the constructor (or destructor) calls.
  >
  > To understand this behavior, consider what would happen if the derived-class version of a virtual was called from a base-class constructor. This virtual probably accesses members of the derived object. After all, if the virtual didn’t need to use members of the derived object, the derived class probably could use the version in its base class. However, those members are uninitialized while a base constructor is running. If such access were allowed, the program would probably crash.
  >
  > [Calling virtual functions inside constructors - Stack Overflow](https://stackoverflow.com/questions/962132/calling-virtual-functions-inside-constructors)
  >
  > <footer>C++ Primer (5th Edition), P745</footer>

1. 
  > **Inherited Constructors**
  >
  > Under the *new standard*, a derived class can reuse the constructors defined by its direct base class.
  >
  > ```c++
  > class Bulk_quote : public Disc_quote {
  > public:
  >     using Disc_quote::Disc_quote;  // inherit Disc_quote's constructors
  >     double net_price(std::size_t) const;
  > };
  > ```
  >
  > Unlike `using` declarations for ordinary members, a constructor `using` declaration does not change the access level of the inherited constructor(s).
  >
  > Moreover, a using declaration can’t specify `explicit` or `constexpr`.
  >
  > If a base-class constructor has default arguments, those arguments are not inherited. Instead, the derived class gets multiple inherited constructors in which each parameter with a default argument is successively omitted.
  >
  > If a base class has several constructors, then with two exceptions, the derived class inherits each of the constructors from its base class. The first exception is that a derived class can inherit some constructors and define its own versions of other constructors.
  >
  > The second exception is that the default, copy, and move constructors are not inherited. These constructors are synthesized using the normal rules.
  >
  > <footer>C++ Primer (5th Edition), P746-747</footer>

1. 
  > **Simulating Virtual Copy**
  >
  > We’ll solve this problem by giving our `Quote` classes a virtual member that allocates a copy of itself.
  >
  > ```c++
  > class Quote {
  > public:
  >     // virtual function to return a dynamically allocated copy of itself
  >     // these members use reference qualifiers; see §13.6.3 (p. 546)
  >     virtual Quote* clone() const & { return new Quote(*this); }
  >     virtual Quote* clone() && { return new Quote(std::move(*this)); }
  >     // other members as before
  > };
  > class Bulk_quote : public Quote {
  >     Bulk_quote* clone() const & { return new Bulk_quote(*this); }
  >     Bulk_quote* clone() && { return new Bulk_quote(std::move(*this)); }
  >     // other members as before
  > };
  > ```
  >
  > Using clone, it is easy to write our new versions of add_item:
  >
  > ```c++
  > class Basket {
  > public:
  >     void add_item(const Quote& sale)  // copy the given object
  >         { items.insert(std::shared_ptr<Quote>(sale.clone())); }
  >     void add_item(Quote&& sale)  // move the given object
  >         { items.insert(std::shared_ptr<Quote>(std::move(sale).clone())); }
  >     // other members as before
  > };
  > ```
  > 
  > Note that in the rvalue version, although the type of `sale` is an rvalue reference type, `sale` (like any other variable) is an lvalue. Therefore, we call `move` to bind an rvalue reference to `sale`.
  >
  > <footer>C++ Primer (5th Edition), P752-753</footer>

1. 
  > **Nontype Template Parameters**
  >
  > ```c++
  > template<unsigned N, unsigned M>
  > int compare(const char (&p1)[N], const char (&p2)[M])
  > {
  >     return strcmp(p1, p2);
  > }
  > ```
  >
  > When we call this version of compare:
  >
  > ```c++
  > compare("hi", "mom")
  > ```
  >
  > the compiler will instantiate:
  >
  > ```c++
  > int compare(const char (&p1)[3], const char (&p2)[4])
  > ```
  >
  > A nontype parameter may be an integral type, or a pointer or (lvalue) reference to an object or to a function type. An argument bound to a nontype integral parameter must be a constant expression. Arguments bound to a pointer or reference nontype parameter must have static lifetime. We may not use an ordinary (non`static`) local object or a dynamic object as a template argument for reference or pointer nontype template parameters. A pointer parameter can also be instantiated by `nullptr` or a zero-valued constant expression.
  >
  > <footer>C++ Primer (5th Edition), P774-775</footer>

1. 
  > By default, a member of an instantiated class template is instantiated only if the member is used.
  >
  > <footer>C++ Primer (5th Edition), P784</footer>

1. 
  > *Inside* the scope of the class template itself, we may use the name of the template without arguments:
  >
  > ```c++
  > template <typename T> class BlobPtr
  > public:
  >     // increment and decrement
  >     BlobPtr& operator++();  // prefix operators
  >     BlobPtr& operator--();
  > };
  > ```
  >
  > Careful readers will have noted that the prefix increment and decrement members of `BlobPtr` return `BlobPtr&`, not `BlobPtr<T>&`. When we are inside the scope of a class template, the compiler treats references to the template itself as if we had supplied template arguments matching the template’s own parameters. That is, it is as if we had written:
  >
  > ```c++
  > BlobPtr<T>& operator++();
  > BlobPtr<T>& operator--();
  > ```
  >
  > When we define members outside the body of a class template, we must remember that we are not in the scope of the class until the class name is seen
  >
  > ```c++
  > // postfix: increment/decrement the object but return the unchanged value
  > template <typename T>
  > BlobPtr<T> BlobPtr<T>::operator++(int)
  > {
  >     // no check needed here; the call to prefix increment will do the check
  >     BlobPtr ret = *this;  // save the current value
  >     ++*this;  // advance one element; prefix ++ checks the increment
  >     return ret;  // return the saved state
  > }
  > ```
  >
  > Because the return type appears outside the scope of the class, we must specify that the return type returns a `BlobPtr` instantiated with the same type as the class. Inside the function body, we are in the scope of the class so do not need to repeat the template argument when we define ret. When we do not supply template arguments, the compiler assumes that we are using the same type as the member’s instantiation. Hence, the definition of `ret` is as if we had written:
  >
  > ```c++
  > BlobPtr<T> ret = *this;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P785</footer>

1. 
  > **Class Templates and Friends**
  >
  > **One-to-One Friendship**
  >
  > ```c++
  > // forward declarations needed for friend declarations in Blob
  > template <typename> class BlobPtr;
  > template <typename> class Blob;  // needed for parameters in operator==
  > template <typename T> bool operator==(const Blob<T>&, const Blob<T>&);
  > template <typename T> class Blob {
  >     // each instantiation of Blob grants access to the version of
  >     // BlobPtr and the equality operator instantiated with the same type
  >     friend class BlobPtr<T>;
  >     friend bool operator==<T> (const Blob<T>&, const Blob<T>&);
  >     // other members as in § 12.1.1 (p. 456)
  > };
  > ```
  >
  > **General and Specific Template Friendship**
  >
  > ```c++
  > // forward declaration necessary to befriend a specific instantiation of a template
  > template <typename T> class Pal;
  > class C {  // C is an ordinary, nontemplate class
  >     friend class Pal<C>;  // Pal instantiated with class C is a friend to C
  >     // all instances of Pal2 are friends to C;
  >     // no forward declaration required when we befriend all instantiations
  >     template <typename T> friend class Pal2;
  > };
  > template <typename T> class C2 {  // C2 is itself a class template
  >     // each instantiation of C2 has the same instance of Pal as a friend
  >     friend class Pal<T>;  // a template declaration for Pal must be in scope
  >     // all instances of Pal2 are friends of each instance of C2, prior declaration needed
  >     template <typename X> friend class Pal2;
  >     // Pal3 is a nontemplate class that is a friend of every instance of C2
  >     friend class Pal3;  // prior declaration for Pal3 not needed
  > };
  > ```
  >
  > **Befriending the Template’s Own Type Parameter**
  >
  > Under the *new standard*, we can make a template type parameter a friend:
  >
  > ```c++
  > template <typename Type> class Bar {
  >     friend Type;  // grants access to the type used to instantiate Bar
  >     // ...
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P786-787</footer>

1. 
  > The *new standard* lets us define a type alias for a class template:
  >
  > ```c++
  > template<typename T> using twin = pair<T, T>;
  > twin<string> authors;  // authors is a pair<string, string>
  > ```
  >
  > <footer>C++ Primer (5th Edition), P788</footer>

1. 
  > Recall that we use the scope operator (::) to access both `static` members and type members. By default, the language assumes that a name accessed through the scope operator is not a type. As a result, if we want to use a type member of a template type parameter, we must explicitly tell the compiler that the name is a type. We do so by using the keyword `typename`:
  >
  > ```c++
  > template <typename T>
  > typename T::value_type top(const T& c)
  > {
  >     if (!c.empty())
  >         return c.back();
  >     else
  >         return typename T::value_type();
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P792</footer>

1. 
  > Under the *new standard*, we can supply default arguments for both function and class templates. Earlier versions of the language, allowed default arguments only with class templates.
  >
  > As an example, we’ll rewrite `compare` to use the library `less` function-object template by default:
  >
  > ```c++
  > // compare has a default template argument, less<T>
  > // and a default function argument, F()
  > template <typename T, typename F = less<T>>
  > int compare(const T &v1, const T &v2, F f = F())
  > {
  >     if (f(v1, v2)) return -1;
  >     if (f(v2, v1)) return 1;
  >     return 0;
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P793</footer>

1. 
  > In large systems, the overhead of instantiating the same template in multiple files can become significant. Under the *new standard*, we can avoid this overhead through an **explicit instantiation**. An explicit instantiation has the form:
  >
  > ```c++
  > extern template declaration;  // instantiation declaration
  > template declaration;         // instantiation definition
  > ```
  >
  > Because the compiler automatically instantiates a template when we use it, the `extern` declaration must appear before any code that uses that instantiation:
  >
  > ```c++
  > // Application.cc
  > // these template types must be instantiated elsewhere in the program
  > extern template class Blob<string>;
  > extern template int compare(const int&, const int&);
  > Blob<string> sa1, sa2;  // instantiation will appear elsewhere
  > // Blob<int> and its initializer_list constructor instantiated in this file
  > Blob<int> a1 = {0,1,2,3,4,5,6,7,8,9};
  > Blob<int> a2(a1);  // copy constructor instantiated in this file
  > int i = compare(a1[0], a2[0]);  // instantiation will appear elsewhere
  > ```
  >
  > The file `Application.o` will contain instantiations for `Blob<int>`, along with the `initializer_list` and copy constructors for that class. The `compare<int>` function and `Blob<string>` class will not be instantiated in that file. There must be definitions of these templates in some other file in the program:
  >
  > ```c++
  > // templateBuild.cc
  > // instantiation file must provide a (nonextern) definition for every
  > // type and function that other files declare as extern
  > template int compare(const int&, const int&);
  > template class Blob<string>;  // instantiates all members of the class template
  > ```
  >
  > When the compiler sees an instantiation definition (as opposed to a declaration), it generates code. Thus, the file `templateBuild.o` will contain the definitions for `compare` instantiated with `int` and for the `Blob<string>` class. When we build the application, we must link `templateBuild.o` with the `Application.o` files.
  >
  > <footer>C++ Primer (5th Edition), P798-799</footer>

1. 
  > **Instantiation Definitions Instantiate All Members**
  >
  > An instantiation definition for a class template instantiates *all* the members of that template including inline member functions. When the compiler sees an instantiation definition it cannot know which member functions the program uses. Hence, unlike the way it handles ordinary class template instantiations, the compiler instantiates *all* the members of that class. Even if we do not use a member, that member will be instantiated. Consequently, we can use explicit instantiation only for types that can be used with all the members of that template.
  >
  > <footer>C++ Primer (5th Edition), P799</footer>

1. 
  > **Exercise 16.27:** For each labeled statement explain what, if any, instantiations happen. If a template is instantiated, explain why; if not, explain why not.
  >
  > ```c++
  > template <typename T> class Stack { };
  > void f1(Stack<char>);                    // (a)
  > class Exercise {
  >     Stack<double> &rsd;                  // (b)
  >     Stack<int> si;                       // (c)
  > };
  > int main() {
  >     Stack<char> *sc;                     // (d)
  >     f1(*sc);                             // (e)
  >     int iObj = sizeof(Stack< string >);  // (f)
  > }
  > ```
  >
  > a,b,d -> no; c,e,f -> yes. [[Details]](https://www.zhihu.com/question/51023809/answer/125970771)
  >
  > <footer>C++ Primer (5th Edition), P800</footer>

1. 
  > `const` conversions and array or function to pointer are the only automatic conversions for arguments to parameters with template types.
  >
  > <footer>C++ Primer (5th Edition), P803</footer>

1. 
  > **Normal Conversions Apply for Explicitly Specified Arguments**
  >
  > ```c++
  > template <typename T>
  > int compare(const T &v1, const T &v2)
  > {
  >     if (v1 < v2) return -1;
  >     if (v2 < v1) return 1;
  >     return 0;
  > }
  >
  > long lng;
  > compare(lng, 1024);        // error: template parameters don't match
  > compare<long>(lng, 1024);  // ok: instantiates compare(long, long)
  > compare<int>(lng, 1024);   // ok: instantiates compare(int, int)
  > ```
  >
  > <footer>C++ Primer (5th Edition), P807</footer>

1. 
  > We might want to write a function that takes a pair of iterators denoting a sequence and returns a reference to an element in the sequence:
  >
  > ```c++
  > template <typename It>
  > ??? &fcn(It beg, It end)
  > {
  >     // process the range
  >     return *beg;  // return a reference to an element from the range
  > }
  > ```
  >
  > Here, we know that our function will return `*beg`, and we know that we can use `decltype(*beg)` to obtain the type of that expression. However, `beg` doesn’t exist until the parameter list has been seen. To define this function, we must use a trailing return type. Because a trailing return appears after the parameter list, it can use the function’s parameters:
  >
  > ```c++
  > // a trailing return lets us declare the return type after the parameter list is seen
  > template <typename It>
  > auto fcn(It beg, It end) -> decltype(*beg)
  > {
  >     // process the range
  >     return *beg;  // return a reference to an element from the range
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P808</footer>

1. 
  > **Standard Type Transformation Templates**
  >
  > ![](/media/cpp_primer_5_tbl_16_1.png)
  >
  > <footer>C++ Primer (5th Edition), P809</footer>

1. 
  > **Reference Collapsing and Rvalue Reference Parameters**
  >
  > Ordinarily, we cannot (directly) define a reference to a reference. However, it is possible to do so indirectly through a type alias or through a template type parameter.
  >
  > If we indirectly create a reference to a reference, then those references "collapse". In all but one case, the references collapse to form an ordinary lvalue reference type. The *new standard*, expanded the collapsing rules to include rvalue references. References collapse to form an rvalue reference only in the specific case of an rvalue reference to an rvalue reference. That is, for a given type `X`:
  >
  > * `X& &`, `X& &&`, and `X&& &` all collapse to type `X&`
  > * The type `X&& &&` collapses to `X&&`
  >
  > <br>
  > *Note:* Reference collapsing applies *only* when a reference to a reference is created indirectly, such as in a type alias or a template parameter.
  >
  > ```c++
  > template <typename T> void f3(T&&);
  > f3(42);  // argument is an rvalue of type int; template parameter T is int
  > f3(i);   // argument is an lvalue; template parameter T is int&
  > f3(ci);  // argument is an lvalue; template parameter T is const int&
  > ```
  >
  > The function parameter in `f3` is `T&&` and `T` is `int&`, so `T&&` is `int& &&`, which collapses to `int&`. Thus, even though the form of the function parameter in `f3` is an rvalue reference (i.e., `T&&`), this call instantiates `f3` with an lvalue reference type (i.e., `int&`):
  >
  > ```c++
  > void f3<int&>(int&);  // when T is int&, function parameter collapses to int&
  > ```
  >
  > There are *two* important consequences from these rules:
  >
  > * A function parameter that is an rvalue reference to a template type parameter (e.g., `T&&`) can be bound to an lvalue; and
  > * If the argument is an lvalue, then the deduced template argument type will be an lvalue reference type and the function parameter will be instantiated as an (ordinary) lvalue reference parameter (`T&`)
  >
  > <br>
  > <footer>C++ Primer (5th Edition), P814</footer>

1. 
  > **How `std::move` Is Defined**
  >
  > ```c++
  > // for the use of typename in the return type and the cast see § 16.1.3 (p. 670)
  > // remove_reference is covered in § 16.2.3 (p. 684)
  > template <typename T>
  > typename remove_reference<T>::type&& move(T&& t)
  > {
  >     // static_cast covered in § 4.11.3 (p. 163)
  >     return static_cast<typename remove_reference<T>::type&&>(t);
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P816</footer>

1. 
  > **Forwarding**
  >
  > ```c++
  > // template that takes a callable and two parameters
  > // and calls the given callable with the parameters ''flipped''
  > // flip1 is an incomplete implementation: top-level const and references are lost
  > template <typename F, typename T1, typename T2>
  > void flip1(F f, T1 t1, T2 t2)
  > {
  >     f(t2, t1);
  > }
  > ```
  >
  > This template works fine until we want to use it to call a function that has a reference parameter:
  >
  > ```c++
  > void f(int v1, int &v2)  // note v2 is a reference
  > {
  >     cout << v1 << " " << ++v2 << endl;
  > }
  > ```
  >
  > Here `f` changes the value of the argument bound to `v2`. However, if we call `f` through `flip1`, the changes made by `f` do not affect the original argument:
  >
  > ```c++
  > f(42, i);         // f changes its argument i
  > flip1(f, j, 42);  // f called through flip1 leaves j unchanged
  > ```
  >
  > Through reference collapsing, if we define the function parameters as `T1&&` and `T2&&`, we can preserve the lvalue/rvalue property of flip’s arguments:
  >
  > ```c++
  > template <typename F, typename T1, typename T2>
  > void flip2(F f, T1 &&t1, T2 &&t2)
  > {
  >     f(t2, t1);
  > }
  > ```
  >
  > Our `flip2` function works fine for functions that take lvalue references but cannot be used to call a function that has an rvalue reference parameter. For example:
  >
  > ```c++
  > void g(int &&i, int& j)
  > {
  >     cout << i << " " << j << endl;
  > }
  >
  > flip2(g, i, 42);  // error: can't initialize int&& from an lvalue
  > ```
  >
  > what is passed to `g` will be the parameter named `t2` inside `flip2`. A function parameter, like any other variable, is an lvalue expression. As a result, the call to `g` in `flip2` passes an lvalue to `g`’s rvalue reference parameter.
  >
  > We can use a new library facility named `forward` to pass `flip2`’s parameters in a way that preserves the types of the original arguments. Like `move`, `forward` is defined in the `utility` header. Unlike `move`, `forward` must be called with an explicit template argument. `forward` returns an rvalue reference to that explicit argument type. That is, the return type of `forward<T>` is `T&&`.
  >
  > ```c++
  > template <typename F, typename T1, typename T2>
  > void flip(F f, T1 &&t1, T2 &&t2)
  > {
  >     f(std::forward<T2>(t2), std::forward<T1>(t1));
  > }
  > ```
  >
  > If we call `flip(g, i, 42)`, `i` will be passed to `g` as an `int&` and `42` will be passed as an `int&&`.
  >
  > <footer>C++ Primer (5th Edition), P818-821</footer>

1. 
  > A **variadic template** is a template function or class that can take a varying number of parameters. The varying parameters are known as a **parameter pack**. There are two kinds of parameter packs: A **template parameter pack** represents zero or more template parameters, and a **function parameter pack** represents zero or more function parameters.
  >
  > ```c++
  > // Args is a template parameter pack; rest is a function parameter pack
  > // Args represents zero or more template type parameters
  > // rest represents zero or more function parameters
  > template <typename T, typename... Args>
  > void foo(const T &t, const Args& ... rest);
  > ```
  >
  > <footer>C++ Primer (5th Edition), P827</footer>

1. 
  > When we need to know how many elements there are in a pack, we can use the `sizeof...` operator. Like `sizeof`, `sizeof...` returns a constant expression and does not evaluate its argument:
  >
  > ```c++
  > template<typename... Args> void g(Args ... args) {
  >     cout << sizeof...(Args) << endl;  // number of type parameters
  >     cout << sizeof...(args) << endl;  // number of function parameters
  > }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P828</footer>

1. 
  > When we **expand** a pack, we also provide a **pattern** to be used on each expanded element. Expanding a pack separates the pack into its constituent elements, applying the pattern to each element as it does so. We trigger an expansion by putting an ellipsis (`...`) to the right of the pattern.
  >
  > We might write a variadic function that calls `debug_rep` on each of its arguments and then calls `print` to print the resulting `string`s:
  >
  > ```c++
  > // call debug_rep on each argument in the call to print
  > template <typename... Args>
  > ostream &errorMsg(ostream &os, const Args&... rest)
  > {
  >     // print(os, debug_rep(a1), debug_rep(a2), ..., debug_rep(an)
  >     return print(os, debug_rep(rest)...);
  > }
  > ```
  >
  > In contrast, the following pattern would fail to compile:
  >
  > ```c++
  > // passes the pack to debug_rep; print(os, debug_rep(a1, a2, ..., an))
  > print(os, debug_rep(rest...));  // error: no matching function to call
  > ```
  >
  > The `debug_rep` function is not variadic and there is no version of `debug_rep` that has five parameters.
  >
  > <footer>C++ Primer (5th Edition), P830-832</footer>

1. 
  > **Function Template Specialization**
  >
  > ```c++
  > // first version; can compare any two types
  > template <typename T> int compare(const T&, const T&);
  > // second version to handle string literals
  > template<size_t N, size_t M>
  > int compare(const char (&)[N], const char (&)[M]);
  > ```
  >
  > However, the version of `compare` that has two nontype template parameters will be called only when we pass a string literal or an array. If we call `compare` with character pointers, the first version of the template will be called:
  >
  > ```c++
  > const char *p1 = "hi", *p2 = "mom";
  > compare(p1, p2);       // calls the first template
  > compare("hi", "mom");  // calls the template with two nontype parameters
  > ```
  >
  > To handle character pointers (as opposed to arrays), we can define a **template specialization** of the first version of `compare`. To indicate that we are specializing a `template`, we use the keyword template followed by an empty pair of angle brackets (`< >`). The empty brackets indicate that arguments will be supplied for all the template parameters of the original template:
  >
  > ```c++
  > // special version of compare to handle pointers to character arrays
  > template <>
  > int compare(const char* const &p1, const char* const &p2)
  > {
  >     return strcmp(p1, p2);
  > }
  > ```
  >
  > *Note:* Specializations instantiate a template; they do not overload it. As a result, specializations do not affect function matching.
  >
  > <footer>C++ Primer (5th Edition), P835-836</footer>

1. 
  > **Class-Template Partial Specializations**
  >
  > Differently from function templates, a class template specialization does not have to supply an argument for every template parameter. We can specify some, but not all, of the template parameters or some, but not all, aspects of the parameters. A class template **partial specialization** is itself a template. Users must supply arguments for those template parameters that are not fixed by the specialization.
  >
  > The library `remove_reference` type works through a series of specializations:
  >
  > ```c++
  > // original, most general template
  > template <class T> struct remove_reference {
  >     typedef T type;
  > };
  > // partial specializations that will be used for lvalue and rvalue references
  > template <class T> struct remove_reference<T&>   // lvalue references
  >     { typedef T type; };
  > template <class T> struct remove_reference<T&&>  // rvalue references
  >     { typedef T type; };
  > ```
  >
  > The specializations will be used for lvalue and rvalue reference types, respectively:
  >
  > ```c++
  > int i;
  > // decltype(42) is int, uses the original template
  > remove_reference<decltype(42)>::type a;
  > // decltype(i) is int&, uses first (T&) partial specialization
  > remove_reference<decltype(i)>::type b;
  > // decltype(std::move(i)) is int&&, uses second (i.e., T&&) partial specialization
  > remove_reference<decltype(std::move(i))>::type c;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P840-841</footer>

1. 
  > **Specializing Members but Not the Class**
  >
  > ```c++
  > template <typename T> struct Foo {
  >     Foo(const T &t = T()): mem(t) { }
  >     void Bar() { /* ... */ }
  >     T mem;
  >     // other members of Foo
  > };
  > template<>  // we're specializing a template
  > void Foo<int>::Bar()  // we're specializing the Bar member of Foo<int>
  > {
  >     // do whatever specialized processing that applies to ints
  > }
  > ```
  >
  > Here we are specializing just one member of the `Foo<int>` class. The other members of `Foo<int>` will be supplied by the `Foo` template:
  >
  > ```c++
  > Foo<string> fs;  // instantiates Foo<string>::Foo()
  > fs.Bar();        // instantiates Foo<string>::Bar()
  > Foo<int> fi;     // instantiates Foo<int>::Foo()
  > fi.Bar();        // uses our specialization of Foo<int>::Bar()
  > ```
  >
  > <footer>C++ Primer (5th Edition), P841</footer>
  
1. 
  > Member templates may not be virtual.
  >
  > <footer>C++ Primer (5th Edition), P795</footer>

1. 
  > By default, the regular-expression language used by `regex` objects is ECMAScript
  >
  > <footer>C++ Primer (5th Edition), P860</footer>

1. 
  > **Regular Expression Library Classes**
  >
  > ![](/media/cpp_primer_5_tbl_17_8.png)
  >
  > The important point is that the RE library types we use must match the type of the input sequence.
  >
  > ```c++
  > regex r("[[:alnum:]]+\\.(cpp|cxx|cc)$", regex::icase);
  > smatch results;  // will match a string input sequence, but not char*
  > if (regex_search("myfile.cc", results, r))  // error: char* input
  >     cout << results.str() << endl;
  > ```
  >
  > The (C++) compiler will reject this code because the type of the match argument and the type of the input sequence do not match. If we want to search a character array, then we must use a `cmatch` object:
  >
  > ```c++
  > cmatch results;  // will match character array input sequences
  > if (regex_search("myfile.cc", results, r))
  >     cout << results.str() << endl;  // print the current match
  > ```
  >
  > <footer>C++ Primer (5th Edition), P864</footer>

1. 
  > The random-number library, defined in the `random` header, solves these problems through a set of cooperating classes: **random-number engines** and **random-number distribution classes**. An engine generates a sequence of `unsigned` random numbers. A distribution uses an engine to generate random numbers of a specified type, in a given range, distributed according to a particular probability distribution.
  >
  > <footer>C++ Primer (5th Edition), P876</footer>

1. 
  > **Manipulators Defined in `iostream`**
  >
  > ![](/media/cpp_primer_5_tbl_17_17.png)
  >
  > <footer>C++ Primer (5th Edition), P890</footer>

1. 
  > **Manipulators Defined in `iomanip`**
  >
  > ![](/media/cpp_primer_5_tbl_17_18.png)
  >
  > <footer>C++ Primer (5th Edition), P893</footer>

1. 
  > **Single-Byte Low-Level IO Operations**
  >
  > ![](/media/cpp_primer_5_tbl_17_19.png)
  >
  > The `peek` function and the version of `get` that takes no argument return a character from the input stream as an `int`. This fact can be surprising; it might seem more natural to have these functions return a `char`.
  >
  > The reason that these functions return an `int` is to allow them to return an end-of-file marker. A given character set is allowed to use every value in the `char` range to represent an actual character. Thus, there is no extra value in that range to use to represent end-of-file.
  >
  > The functions that return `int` convert the character they return to `unsigned char` and then promote that value to `int`. As a result, even if the character set has characters that map to negative values, the `int` returned from these operations will be a positive value. The library uses a negative value to represent end-of-file, which is thus guaranteed to be distinct from any legitimate character value. Rather than requiring us to know the actual value returned, the `iostream` header defines a `const` named `EOF` that we can use to test if the value returned from `get` is end-of-file. It is essential that we use an `int` to hold the return from these functions:
  >
  > ```c++
  > int ch;  // use an int, not a char to hold the return from get()
  > // loop to read and write all the data in the input
  > while ((ch = cin.get()) != EOF)
  >     cout.put(ch);
  > ```
  >
  > This program operates identically to the one below, the only difference being the version of `get` that is used to read the input.
  >
  > ```c++
  > char ch;
  > while (cin.get(ch))
  >     cout.put(ch);
  > ```
  >
  > <footer>C++ Primer (5th Edition), P894-896</footer>

1. 
  > **Multi-Byte Low-Level IO Operations**
  >
  > ![](/media/cpp_primer_5_tbl_17_20.png)
  >
  > Several of the read operations read an unknown number of bytes from the input. We can call `gcount` to determine how many characters the last unformatted input operation read. It is essential to call `gcount` before any intervening unformatted input operation. In particular, the single-character operations that put characters back on the stream are also unformatted input operations. If `peek`, `unget`, or `putback` are called before calling `gcount`, then the return value will be 0.
  >
  > <footer>C++ Primer (5th Edition), P896-897</footer>

1. 
  > Random IO is an inherently system-dependent. To understand how to use these features, you must consult your system’s documentation.
  >
  > On most systems, the streams bound to `cin`, `cout`, `cerr`, and `clog` do *not* support random access—after all, what would it mean to jump back ten places when we’re writing directly to `cout`? We can call the seek and tell functions, but these functions will fail at run time, leaving the stream in an invalid state.
  >
  > <footer>C++ Primer (5th Edition), P897</footer>

1. 
  > **Seek and Tell Functions**
  >
  > ![](/media/cpp_primer_5_tbl_17_21.png)
  >
  > The fact that the library distinguishes between the "putting" and "getting" versions of the seek and tell functions can be misleading. Even though the library makes this distinction, it maintains only a *single* marker in a stream—there is *not* a distinct read marker and write marker.
  >
  > When we’re dealing with an input-only or output-only stream, the distinction isn’t even apparent. We can use only the `g` or only the `p` versions on such streams. If we attempt to call `tellp` on an `ifstream`, the compiler will complain. Similarly, it will not let us call `seekg` on an `ostringstream`.
  >
  > The `fstream` and `stringstream` types can read and write the same stream. In these types there is a single buffer that holds data to be read and written and a single marker denoting the current position in the buffer. The library maps both the `g` and `p` positions to this single marker.
  >
  > <footer>C++ Primer (5th Edition), P899-900</footer>

1. 
  > This process, known as **stack unwinding**, continues up the chain of nested function calls until a `catch` clause for the exception is found, or the `main` function itself is exited without having found a matching `catch`.
  >
  > <footer>C++ Primer (5th Edition), P907</footer>

1. 
  > The fact that destructors are run during stack unwinding affects how we write destructors. During stack unwinding, an exception has been raised but is not yet handled. If a new exception is thrown during stack unwinding and not caught in the function that threw it, `terminate` is called. Because destructors may be invoked during stack unwinding, they should *never* throw exceptions that the destructor itself does not handle. That is, if a destructor does an operation that might throw, it should wrap that operation in a `try` block and handle it locally to the destructor.
  >
  > <footer>C++ Primer (5th Edition), P908-909</footer>

1. 
  > The rules for when an exception matches a `catch` exception declaration are much more restrictive than the rules used for matching arguments with parameter types. Most conversions are not allowed—the types of the exception and the `catch` declaration must match exactly with only a few possible differences:
  >
  > * Conversions from non`const` to `const` are allowed. That is, a `throw` of a non`const` object can match a `catch` specified to take a reference to `const`.
  > * Conversions from derived type to base type are allowed.
  > * An array is converted to a pointer to the type of the array; a function is converted to the appropriate pointer to function type.
  >
  > <br>
  > No other conversions are allowed to match a `catch`. In particular, neither the standard arithmetic conversions nor conversions defined for class types are permitted.
  >
  > <footer>C++ Primer (5th Edition), P911-912</footer>

1. 
  > A `catch` passes its exception out to another `catch` by **rethrowing** the exception. A rethrow is a `throw` that is not followed by an expression:
  >
  > ```c++
  > throw;
  > ```
  >
  > An empty `throw` can appear only in a `catch` or in a function called (directly or indirectly) from a `catch`. If an empty `throw` is encountered when a handler is not active, `terminate` is called.
  >
  > <footer>C++ Primer (5th Edition), P912</footer>

1. 
  > Such handlers, sometimes known as **catch-all** handlers, have the form `catch(...)`. A catch-all clause matches any type of exception.
  >
  > <footer>C++ Primer (5th Edition), P912</footer>

1. 
  > To handle an exception from a constructor initializer, we must write the constructor as a **function `try` block**. A function `try` block lets us associate a group of `catch` clauses with the initialization phase of a constructor (or the destruction phase of a destructor) as well as with the constructor’s (or destructor’s) function body. As an example, we might wrap the `Blob` constructors in a function `try` block:
  >
  > ```c++
  > template <typename T>
  > Blob<T>::Blob(std::initializer_list<T> il) try :
  > data(std::make_shared<std::vector<T>>(il)) {
  >     /* empty body */
  > } catch(const std::bad_alloc &e) { handle_out_of_memory(e); }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P914-915</footer>

1. 
  > Under the *new standard*, a function can specify that it does not throw exceptions by providing a **`noexcept` specification**. The keyword `noexcept` following the function parameter list indicates that the function won’t throw: 
  >
  > ```c++
  > void recoup(int) noexcept;  // won't throw
  > void alloc(int);            // might throw
  > ```
  >
  > These declarations say that `recoup` will not throw any exceptions and that `alloc` might. We say that `recoup` has a **nonthrowing specification**.
  >
  > The `noexcept` specifier must appear on all of the declarations and the corresponding definition of a function or on none of them. The specifier precedes a trailing return. We may also specify `noexcept` on the declaration and definition of a function pointer. It may not appear in a `typedef` or type alias. In a member function the `noexcept` specifier follows any `const` or reference qualifiers, and it precedes `final`, `override`, or `= 0` on a virtual function.
  >
  > <footer>C++ Primer (5th Edition), P915-916</footer>

1. 
  > As a result, it is possible that a function that claims it will not throw will in fact throw. If a `noexcept` function does throw, `terminate` is called, thereby enforcing the promise not to throw at run time. It is unspecified whether the stack is unwound. As a result, `noexcept` should be used in *two* cases: if we are confident that the function won’t throw, and/or if we don’t know what we’d do to handle the error anyway.
  >
  > Specifying that a function won’t throw effectively promises the *callers* of the nonthrowing function that they will never need to deal with exceptions. Either the function won’t throw, or the whole program will terminate; the caller escapes responsibility either way.
  >
  > <footer>C++ Primer (5th Edition), P916</footer>

1. 
  > **Backward Compatibility: Exception Specifications**
  >
  > Earlier versions of C++ had a more elaborate scheme of exception specifications that allowed us to specify the types of exceptions that a function might throw. A function can specify the keyword `throw` followed by a parenthesized list of types that the function might throw.
  >
  > This approach was never widely used and has been *deprecated* in the current standard. Although these more elaborate specifiers have been deprecated, there is one use of the old scheme that is in widespread use. A function that is designated by `throw()` promises not to throw any exceptions:
  >
  > ```c++
  > void recoup(int) noexcept;  // recoup doesn't throw
  > void recoup(int) throw();   // equivalent declaration
  > ```
  >
  > These declarations of `recoup` are equivalent. Both say that `recoup` won’t throw.
  >
  > <footer>C++ Primer (5th Edition), P917</footer>

1. 
  > **Arguments to the noexcept Specification**
  >
  > The `noexcept` specifier takes an optional argument that must be convertible to `bool`: If the argument is `true`, then the function won’t throw; if the argument is `false`, then the function might throw:
  >
  > ```c++
  > void recoup(int) noexcept(true);  // recoup won't throw
  > void alloc(int) noexcept(false);  // alloc can throw
  > ```
  >
  > **The `noexcept` Operator**
  >
  > Arguments to the `noexcept` specifier are often composed using the **`noexcept` operator**. The `noexcept` operator is a unary operator that returns a `bool` rvalue constant expression that indicates whether a given expression might throw. Like `sizeof`, `noexcept` does not evaluate its operand.
  >
  > More generally,
  >
  > ```c++
  > noexcept(e)
  > ```
  >
  > is `true` if all the functions called by `e` have nonthrowing specifications and `e` itself does not contain a `throw`. Otherwise, `noexcept(e)` returns `false`.
  >
  > We can use the `noexcept` operator to form an exception specifier as follows:
  >
  > ```c++
  > void f() noexcept(noexcept(g()));  // f has same exception specifier as g
  > ```
  >
  > <footer>C++ Primer (5th Edition), P917-918</footer>

1. 
  > **Exception Specifications and Pointers, Virtuals, and Copy Control**
  >
  > If we declare a pointer that has a nonthrowing exception specification, we can use that pointer only to point to similarly qualified functions. A pointer that specifies (explicitly or implicitly) that it might throw can point to any function, even if that function includes a promise not to throw.
  >
  > If a virtual function includes a promise not to throw, the inherited virtuals must also promise not to throw. On the other hand, if the base allows exceptions, it is okay for the derived functions to be more restrictive and promise not to throw.
  >
  > When the compiler synthesizes the copy-control members, it generates an exception specification for the synthesized member. If all the corresponding operation for all the members and base classes promise not to throw, then the synthesized member is `noexcept`. If any function invoked by the synthesized member can throw, then the synthesized member is `noexcept(false)`. Moreover, if we do not provide an exception specification for a destructor that we do define, the compiler synthesizes one for us. The compiler generates the same specification as it would have generated had it synthesized the destructor for that class.
  >
  > <footer>C++ Primer (5th Edition), P919</footer>

1. 
  > The *new standard* introduced a new kind of nested namespace, an **inline namespace**. Unlike ordinary nested namespaces, names in an inline namespace can be used as if they were direct members of the enclosing namespace. That is, we need not qualify names from an inline namespace by their namespace name. We can access them using only the name of the enclosing namespace.
  >
  > An inline namespace is defined by preceding the keyword `namespace` with the keyword `inline`:
  >
  > ```c++
  > inline namespace FifthEd {
  >     // namespace for the code from the Primer Fifth Edition
  > }
  > namespace FifthEd {  // implicitly inline
  > class Query_base { /* ... */ };
  >     // other Query-related declarations
  > }
  > ```
  >
  > The keyword must appear on the first definition of the namespace. If the namespace is later reopened, the keyword inline need not be, but may be, repeated.
  >
  > <footer>C++ Primer (5th Edition), P927-928</footer>

1. 
  > An **unnamed namespace** is the keyword `namespace` followed immediately by a block of declarations delimited by curly braces. Variables defined in an unnamed namespace have static lifetime: They are created before their first use and destroyed when the program ends.
  >
  > An unnamed namespace may be discontiguous within a given file but does not span files. Each file has its own unnamed namespace. If two files contain unnamed namespaces, those namespaces are unrelated.
  >
  > Names defined in an unnamed namespace are used directly; after all, there is no namespace name with which to qualify them.
  >
  > Names defined in an unnamed namespace are in the same scope as the scope at which the namespace is defined. If an unnamed namespace is defined at the outermost scope in the file, then names in the unnamed namespace must differ from names defined at global scope: 
  >
  > ```c++
  > int i;  // global declaration for i
  > namespace {
  >     int i;
  > }
  > // ambiguous: defined globally and in an unnested, unnamed namespace
  > i = 10;
  > ```
  >
  > **Unnamed Namespaces Replace File Statics**
  >
  > Prior to the introduction of namespaces, programs declared names as `static` to make them local to a file. The use of *file statics* is inherited from C. In C, a global entity declared `static` is invisible outside the file in which it is declared.
  >
  > <footer>C++ Primer (5th Edition), P928-929</footer>

1. 
  > A **namespace alias** can be used to associate a shorter synonym with a namespace name. For example, a long namespace name such as 
  >
  > ```c++
  > namespace cplusplus_primer { /* ... */ };
  > ```
  >
  > can be associated with a shorter synonym as follows: 
  >
  > ```c++
  > namespace primer = cplusplus_primer;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P930</footer>

1. 
  > A **`using` declaration** introduces only one namespace member at a time.
  >
  > A **`using` directive**, like a `using` declaration, allows us to use the unqualified form of a namespace name. Unlike a `using` declaration, we retain no control over which names are made visible—they all are.
  >
  > <footer>C++ Primer (5th Edition), P930-931</footer>

1. 
  > **Argument-Dependent Lookup and Parameters of Class Type**
  >
  > Consider the following simple program:
  >
  > ```c++
  > std::string s;
  > std::cin >> s;
  > ```
  >
  > As we know, this call is equivalent to:
  >
  > ```c++
  > operator>>(std::cin, s);
  > ```
  >
  > This `operator>>` function is defined by the `string` library, which in turn is defined in the `std` namespace. Yet we can we call `operator>>` without an `std::` qualifier and without a `using` declaration.
  >
  > We can directly access the output operator because there is an important exception to the rule that names defined in a namespace are hidden. When we pass an object of a class type to a function, the compiler searches the namespace in which the argument’s class is defined *in addition to* the normal scope lookup. This exception also applies for calls that pass pointers or references to a class type.
  >
  > <footer>C++ Primer (5th Edition), P936</footer>

1. 
  > **Lookup and `std::move` and `std::forward`**
  >
  > Now consider the library `move` and `forward` functions. Both of these functions are template functions, and the library defines versions of them that have a single rvalue reference function parameter. As we’ve seen, in a function template, an rvalue reference parameter can match any type. If our application defines a function named `move` that takes a single parameter, then—no matter what type the parameter has—the application’s version of `move` will collide with the library version. Similarly for `forward`.
  >
  > As a result, name collisions with `move` (and `forward`) are more likely than collisions with other library functions. In addition, because `move` and `forward` do very specialized type manipulations, the chances that an application specifically wants to override the behavior of these functions are pretty small.
  >
  > The fact that collisions are more likely—and are less likely to be intentional—explains why we suggest always using the fully qualified versions of these names. So long as we write `std::move` rather than `move`, we know that we will get the version from the standard library.
  >
  > <footer>C++ Primer (5th Edition), P937</footer>

1. 
  > **Inherited Constructors and Multiple Inheritance**
  >
  > Under the *new standard*, a derived class can inherit its constructors from one or more of its base classes. It is an error to inherit the same constructor (i.e., one with the same parameter list) from more than one base class:
  >
  > ```c++
  > struct Base1 {
  >     Base1() = default;
  >     Base1(const std::string&);
  >     Base1(std::shared_ptr<int>);
  > };
  > struct Base2 {
  >     Base2() = default;
  >     Base2(const std::string&);
  >     Base2(int);
  > };
  > // error: D1 attempts to inherit D1::D1 (const string&) from both base classes
  > struct D1: public Base1, public Base2 {
  >     using Base1::Base1;  // inherit constructors from Base1
  >     using Base2::Base2;  // inherit constructors from Base2
  > };
  > ```
  >
  > A class that inherits the same constructor from more than one base class must define its own version of that constructor:
  >
  > ```c++
  > struct D2: public Base1, public Base2 {
  >     using Base1::Base1;  // inherit constructors from Base1
  >     using Base2::Base2;  // inherit constructors from Base2
  >     // D2 must define its own constructor that takes a string
  >     D2(const string &s): Base1(s), Base2(s) { }
  >     D2() = default;  // needed once D2 defines its own constructor
  > };
  > ```
  >
  > <footer>C++ Primer (5th Edition), P943</footer>

1. 
  > In a virtual derivation, the virtual base is initialized by the most derived constructor. In our example, when we create a `Panda` object, the `Panda` constructor alone controls how the `ZooAnimal` base class is initialized.
  >
  > ![](/media/cpp_primer_5_fig_18_3.png)
  >
  > Of course, each class in the hierarchy might at some point be the "most derived" object. As long as we can create independent objects of a type derived from a virtual base, the constructors in that class must initialize its virtual base. For example, in our hierarchy, when a `Bear` (or a `Raccoon`) object is created, there is no further derived type involved. In this case, the `Bear` (or `Raccoon`) constructors directly initialize their `ZooAnimal` base as usual.
  >
  > When a `Panda` is created, it is the most derived type and controls initialization of the shared `ZooAnimal` base. Even though `ZooAnimal` is not a direct base of `Panda`, the `Panda` constructor initializes `ZooAnimal`:
  >
  > ```c++
  > Panda::Panda(std::string name, bool onExhibit)
  > : ZooAnimal(name, onExhibit, "Panda"),
  >   Bear(name, onExhibit),
  >   Raccoon(name, onExhibit),
  >   Endangered(Endangered::critical),
  >   sleeping_flag(false) { }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P953-954</footer>

1. 
  > Virtual base classes are always constructed prior to nonvirtual base classes regardless of where they appear in the inheritance hierarchy.
  >
  > <footer>C++ Primer (5th Edition), P954</footer>

1. 
  > A class can have more than one virtual base class. In that case, the virtual subobjects are constructed in left-to-right order as they appear in the derivation list. For example, in the following whimsical `TeddyBear` derivation, there are two virtual base classes: `ToyAnimal`, a direct virtual base, and `ZooAnimal`, which is a virtual base class of `Bear`:
  >
  > ```c++
  > class Character { /* ... */ };
  > class BookCharacter : public Character { /* ... */ };
  > class ToyAnimal { /* ... */ };
  > class TeddyBear : public BookCharacter,
  > public Bear, public virtual ToyAnimal
  >     { /* ... */ };
  > ```
  >
  > The direct base classes are examined in declaration order to determine whether there are any virtual base classes. If so, the virtual bases are constructed first, followed by the nonvirtual base-class constructors in declaration order. Thus, to create a `TeddyBear`, the constructors are invoked in the following order:
  >
  > ```c++
  > ZooAnimal();      // Bear's virtual base class
  > ToyAnimal();      // direct virtual base class
  > Character();      // indirect base class of first nonvirtual base class
  > BookCharacter();  // first direct nonvirtual base class
  > Bear();           // second direct nonvirtual base class
  > TeddyBear();      // most derived class
  > ```
  >
  > The same order is used in the synthesized copy and move constructors, and members are assigned in this order in the synthesized assignment operators. As usual, an object is destroyed in reverse order from which it was constructed. The `TeddyBear` part will be destroyed first and the `ZooAnimal` part last.
  >
  > <footer>C++ Primer (5th Edition), P955</footer>

1. 
  > **Exercise 18.29**
  >
  > ```c++
  > class Class { ... };
  > class Base : public Class { ... };
  > class D1 : virtual public Base { ... };
  > class D2 : virtual public Base { ... };
  > class MI : public D1, public D2 { ... };
  > class Final : public MI, public Class { ... };
  > ```
  >
  > (a) In what order are constructors and destructors run on a Final object?
  >
  > Answer: Class Base D1 D2 MI Class Final (ctor).
  >
  > (b) A Final object has how many Base parts? How many Class parts?
  >
  > Answer: 1, 2.
  >
  > (c) Which of the following assignments is a compile-time error?
  >
  > ```c++
  > Base *pb; Class *pc; MI *pmi; D2 *pd2;
  > ```
  >
  > (a) `pb = new Class;`  (error)
  >
  > (b) `pc = new Final;`  (error)
  >
  > (c) `pmi = pb;`        (error)
  >
  > (d) `pd2 = pmi;`       (correct)
  >
  > [[Details]](https://github.com/Mooophy/Cpp-Primer/blob/master/ch18/ex18_29.cpp)
  >
  > <footer>C++ Primer (5th Edition), P955-956</footer>

1. 
  > **Overloading `new` and `delete`**
  >
  > Applications can define `operator new` and `operator delete` functions in the global scope and/or as member functions. When the compiler sees a `new` or `delete` expression, it looks for the corresponding `operator` function to call. If the object being allocated (deallocated) has class type, the compiler first looks in the scope of the class, including any base classes. If the class has a member `operator new` or `operator delete`, that function is used by the `new` or `delete` expression. Otherwise, the compiler looks for a matching function in the global scope. If the compiler finds a user-defined version, it uses that function to execute the `new` or `delete` expression. Otherwise, the standard library version is used.
  >
  > <footer>C++ Primer (5th Edition), P961-962</footer>

1. 
  > **The `operator new` and `operator delete` Interface**
  > 
  > The library defines eight overloaded versions of `operator new` and `delete` functions. The first four support the versions of `new` that can throw a `bad_alloc` exception. The next four support nonthrowing versions of `new`: 
  >
  > ```c++
  > // these versions might throw an exception
  > void *operator new(size_t);               // allocate an object
  > void *operator new[](size_t);             // allocate an array
  > void *operator delete(void*) noexcept;    // free an object
  > void *operator delete[](void*) noexcept;  // free an array
  > 
  > // versions that promise not to throw; see § 12.1.2 (p. 460)
  > void *operator new(size_t, nothrow_t&) noexcept;
  > void *operator new[](size_t, nothrow_t&) noexcept;
  > void *operator delete(void*, nothrow_t&) noexcept;
  > void *operator delete[](void*, nothrow_t&) noexcept;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P962</footer>

1. 
  > **`new` Expression versus `operator new` Function**
  >
  > A `new` expression always executes by calling an `operator new` function to obtain memory and then constructing an object in that memory. A `delete` expression always executes by destroying an object and then calling an `operator delete` function to free the memory used by the object.
  >
  > By providing our own definitions of the `operator new` and `operator delete` functions, we can change how memory is allocated. However, we cannot change this basic meaning of the `new` and `delete` operators.
  >
  > <footer>C++ Primer (5th Edition), P963</footer>

1. 
  > A simple way to write `operator new` and `operator delete` is as follows:
  >
  > ```c++
  > void *operator new(size_t size) {
  >     if (void *mem = malloc(size))
  >         return mem;
  >     else
  >         throw bad_alloc();
  > }
  > void operator delete(void *mem) noexcept { free(mem); }
  > ```
  >
  > <footer>C++ Primer (5th Edition), P964</footer>

1. 
  > **Placement `new` Expressions**
  >
  > In earlier versions of the language—before the `allocator` class was part of the library—applications that wanted to separate allocation from initialization did so by calling `operator new` and `operator delete`. These functions behave analogously to the `allocate` and `deallocate` members of `allocator`. Like those members, `operator new` and `operator delete` functions allocate and deallocate memory but do not construct or destroy objects.
  >
  > Differently from an `allocator`, there is no `construct` function we can call to construct objects in memory allocated by `operator new`. Instead, we use the **placement `new`** form of `new` to construct an object. As we’ve seen, this form of `new` provides extra information to the allocation function. We can use placement `new` to pass an address, in which case the placement new expression has the form
  >
  > ```c++
  > new (place_address) type
  > new (place_address) type (initializers)
  > new (place_address) type [size]
  > new (place_address) type [size] { braced initializer list }
  > ```
  >
  > When called with an address and no other arguments, placement `new` uses `operator new(size_t, void*)` to "allocate" its memory. This is the version of `operator new` that we are not allowed to redefine. This function does *not* allocate any memory; it simply returns its pointer argument. The overall `new` expression then finishes its work by initializing an object at the given address. In effect, placement `new` allows us to construct an object at a specific, preallocated memory address.
  >
  > <footer>C++ Primer (5th Edition), P965</footer>

1. 
  > A `dynamic_cast` has the following form:
  >
  > ```c++
  > dynamic_cast<type*>(e)
  > dynamic_cast<type&>(e)
  > dynamic_cast<type&&>(e)
  > ```
  >
  > where `type` must be a class type and (ordinarily) names a class that *has* virtual functions.
  >
  > In all cases, the type of `e` must be either a class type that is publicly derived from the target type, a `public` base class of the target *type*, or the same as the target *type*. If `e` has one of these types, then the cast will succeed. Otherwise, the cast fails. If a `dynamic_cast` to a pointer type fails, the result is 0. If a `dynamic_cast` to a reference type fails, the operator throws an exception of type `bad_cast`.
  >
  > <footer>C++ Primer (5th Edition), P965</footer>

1. 
  > A `typeid` expression has the form `typeid(e)` where `e` is any expression or a type name. The result of a `typeid` operation is a reference to a `const` object of a library type named `type_info`, or a type publicly derived from `type_info`. The `type_info` class is defined in the `typeinfo` header.
  >
  > Ordinarily, we use `typeid` to compare the types of two expressions or to compare the type of an expression to a specified type:
  >
  > ```c++
  > Derived *dp = new Derived;
  > Base *bp = dp;  // both pointers point to a Derived object
  > // compare the type of two objects at run time
  > if (typeid(*bp) == typeid(*dp)) {
  >     // bp and dp point to objects of the same type
  > }
  > // test whether the run-time type is a specific type
  > if (typeid(*bp) == typeid(Derived)) {
  >     // bp actually points to a Derived
  > }
  > ```
  >
  > Note that the operands to the `typeid` are objects—we used `*bp`, not `bp`:
  >
  > ```c++
  > // test always fails: the type of bp is pointer to Base
  > if (typeid(bp) == typeid(Derived)) {
  >     // code never executed
  > }
  > ```
  >
  > The `typeid` of a pointer (as opposed to the object to which the pointer points) returns the static, compile-time type of the pointer.
  >
  > <footer>C++ Primer (5th Edition), P969-970</footer>

1. 
  > **Run-time type identification** (RTTI) is provided through two operators:
  >   * The `typeid` operator, which returns the type of a given expression
  >   * The `dynamic_cast` operator, which safely converts a pointer or reference to a base type into a pointer or reference to a derived type
  >
  > <br>
  > When applied to pointers or references to types that *have* virtual functions, these operators use the dynamic type of the object to which the pointer or reference is bound.
  >
  > As an example of when RTTI might be useful, consider a class hierarchy for which we'd like to implement the equality operator. Two objects are equal if they have the same type and same value for a given set of their data members. Each derived type may add its own data, which we will want to include when we test for equality.
  >
  > <footer>C++ Primer (5th Edition), P966, P970-971</footer>

1. 
  > C++ has two kinds of enumerations: scoped and unscoped. The *new standard* introduced **scoped enumerations**. We define a scoped enumeration using the keywords `enum class` (or, equivalently, `enum struct`), followed by the enumeration name and a comma-separated list of **enumerators** enclosed in curly braces. A semicolon follows the close curly:
  >
  > ```c++
  > enum class open_modes {input, output, append};
  > ```
  >
  > We define an **unscoped enumeration** by omitting the `class` (or `struct`) keyword. The enumeration name is optional in an unscoped `enum`:
  >
  > ```c++
  > enum color {red, yellow, green};  // unscoped enumeration
  > // unnamed, unscoped enum
  > enum {floatPrec = 6, doublePrec = 10, double_doublePrec = 10};
  > ```
  >
  > If the `enum` is unnamed, we may define objects of that type only as part of the `enum` definition. As with a class definition, we can provide a comma-separated list of declarators between the close curly and the semicolon that ends the `enum` definition.
  >
  > The names of the enumerators in a scoped enumeration follow normal scoping rules and are inaccessible outside the scope of the enumeration. The enumerator names in an unscoped enumeration are placed into the same scope as the enumeration itself.
  >
  > <footer>C++ Primer (5th Edition), P975</footer>

1. 
  > An enumerator value need not be unique.
  >
  > Enumerators are `const` and, if initialized, their initializers must be constant expressions.
  >
  > Objects or enumerators of an unscoped enumeration type are automatically converted to an integral type. As a result, they can be used where an integral value is required:
  >
  > ```c++
  > int i = color::red;    // ok: unscoped enumerator implicitly converted to int
  > int j = peppers::red;  // error: scoped enumerations are not implicitly converted
  > ```
  >
  > <footer>C++ Primer (5th Edition), P976</footer>

1. 
  > **Specifying the Size of an `enum`**
  >
  > Although each `enum` defines a unique type, it is represented by one of the built-in integral types. Under the *new standard*, we may specify that type by following the `enum` name with a colon and the name of the type we want to use:
  >
  > ```c++
  > enum intValues : unsigned long long {
  >     charTyp = 255, shortTyp = 65535, intTyp = 65535,
  >     longTyp = 4294967295UL,
  >     long_longTyp = 18446744073709551615ULL
  > };
  > ```
  >
  > If we do not specify the underlying type, then by default scoped `enum`s have `int` as the underlying type. There is no default for unscoped `enum`s; all we know is that the underlying type is large enough to hold the enumerator values. When the underlying type is specified (including implicitly specified for a scoped `enum`), it is an error for an enumerator to have a value that is too large to fit in that type.
  >
  > <footer>C++ Primer (5th Edition), P976-977</footer>

1. 
  > **Forward Declarations for Enumerations**
  >
  > Under the *new standard*, we can forward declare an `enum`. An enum forward declaration must specify (implicitly or explicitly) the underlying size of the `enum`:
  >
  > ```c++
  > // forward declaration of unscoped enum named intValues
  > enum intValues : unsigned long long;  // unscoped, must specify a type
  > enum class open_modes;                // scoped enums can use int by default
  > ```
  >
  > Because there is no default size for an unscoped `enum`, every declaration must include the size of that `enum`. We can declare a scoped `enum` without specifying a size, in which case the size is implicitly defined as `int`.
  >
  > <footer>C++ Primer (5th Edition), P977</footer>

1. 
  > **Pointers to Data Members**
  >
  > ```c++
  > class Screen {
  > public:
  >     typedef std::string::size_type pos;
  >     char get_cursor() const { return contents[cursor]; }
  >     char get() const;
  >     char get(pos ht, pos wd) const;
  > private:
  >     std::string contents;
  >     pos cursor;
  >     pos height, width;
  > };
  > ```
  >
  > For example:
  >
  > ```c++
  > // pdata can point to a string member of a const (or non const) Screen object
  > const string Screen::*pdata;
  > ```
  >
  > declares that `pdata` is a "pointer to a member of class `Screen` that has type `const string`".
  >
  > When we initialize (or assign to) a pointer to member, we say to which member it points. For example, we can make `pdata` point to the `contents` member of an unspecified `Screen` object as follows:
  >
  > ```c++
  > pdata = &Screen::contents;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P979</footer>

1. 
  > **Using a Pointer to Data Member**
  >
  > Analogous to the member access operators, `.` and `->`, there are two pointer-tomember access operators, `.*` and `->*`, that let us supply an object and dereference the pointer to fetch a member of that object:
  >
  > ```c++
  > Screen myScreen, *pScreen = &myScreen;
  > // .* dereferences pdata to fetch the contents member from the object myScreen
  > auto s = myScreen.*pdata;
  > // ->* dereferences pdata to fetch contents from the object to which pScreen points
  > s = pScreen->*pdata;
  > ```
  >
  > <footer>C++ Primer (5th Edition), P979-980</footer>

1. 
  > Because of the relative precedence of the call operator, declarations of pointers to member functions and calls through such pointers must use parentheses: `(C::*p)(parms)` and `(obj.*p)(args)`.
  >
  > <footer>C++ Primer (5th Edition), P982</footer>

1. 
  > **Using Member Functions as Callable Objects**
  >
  > Because a pointer to member is not a callable object, we cannot directly pass a pointer to a member function to an algorithm. As an example, if we wanted to find the first empty `string` in a `vector` of `string`s, the obvious call won’t work:
  >
  > ```c++
  > auto fp = &string::empty;  // fp points to the string empty function
  > // error: must use .* or ->* to call a pointer to member
  > find_if(svec.begin(), svec.end(), fp);
  > ```
  >
  > **Using `function` to Generate a Callable**
  >
  > One way to obtain a callable from a pointer to member function is by using the library function template:
  >
  > ```c++
  > function<bool (const string&)> fcn = &string::empty;
  > find_if(svec.begin(), svec.end(), fcn);
  > ```
  >
  > When a `function` object holds a pointer to a member function, the `function` class knows that it must use the appropriate pointer-to-member operator to make the call. That is, we can imagine that `find_if` will have code something like
  >
  > ```c++
  > // assuming it is the iterator inside find_if, so *it is an object in the given range
  > if (fcn(*it))  // assuming fcn is the name of the callable inside find_if
  > ```
  >
  > which `function` will execute using the proper pointer-to-member operator. In essence, the `function` class will transform this call into something like
  >
  > ```c++
  > // assuming it is the iterator inside find_if, so *it is an object in the given range
  > if (((*it).*p)())  // assuming p is the pointer to member function inside fcn
  > ```
  >
  > When we defined `fcn`, we knew that we wanted to call `find_if`  on a sequence of `string` objects. Hence, we asked `function` to generate a callable that took `string` objects. Had our `vector` held pointers to `string`, we would have told `function` to expect a pointer:
  >
  > ```c++
  > vector<string*> pvec;
  > function<bool (const string*)> fp = &string::empty;
  > // fp takes a pointer to string and uses the ->* to call empty
  > find_if(pvec.begin(), pvec.end(), fp);
  > ```
  >
  > **Using `mem_fn` to Generate a Callable**
  >
  > Like `function`, `mem_fn` generates a callable object from a pointer to member. Unlike `function`, `mem_fn` will deduce the type of the callable from the type of the pointer to member:
  >
  > ```c++
  > find_if(svec.begin(), svec.end(), mem_fn(&string::empty));
  > ```
  >
  > The callable generated by `mem_fn` can be called on either an object or a pointer:
  >
  > ```c++
  > auto f = mem_fn(&string::empty);  // f takes a string or a string*
  > f(*svec.begin());  // ok: passes a string object; f uses .* to call empty
  > f(&svec[0]);       // ok: passes a pointer to string; f uses .-> to call empty
  > ```
  >
  > **Using `bind` to Generate a Callable**
  >
  > We can also use `bind` to generate a callable from a member function:
  >
  > ```c++
  > // bind each string in the range to the implicit first argument to empty
  > auto it = find_if(svec.begin(), svec.end(), bind(&string::empty, _1));
  > ```
  >
  > As with `function`, when we use `bind`, we must make explicit the member function’s normally implicit parameter that represents the object on which the member function will operate. Like `mem_fn`, the first argument to the callable generated by `bind` can be either a pointer or a reference to a `string`:
  >
  > ```c++
  > auto f = bind(&string::empty, _1);
  > f(*svec.begin());  // ok: argument is a string f will use .* to call empty
  > f(&svec[0]);       // ok: argument is a pointer to string f will use .-> to call empty
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P985-987</footer>

1. 
  > **The Nested and Enclosing Classes Are Independent**
  >
  > Although a nested class is defined in the scope of its enclosing class, it is important to understand that there is no connection between the objects of an enclosing class and objects of its nested classe(s). A nested-type object contains only the members defined inside the nested type. Similarly, an object of the enclosing class has only those members that are defined by the enclosing class. It does not contain the data members of any nested classes.
  > 
  > <footer>C++ Primer (5th Edition), P991</footer>

1. 
  > Some, but not all, class features apply equally to `union`s. A `union` cannot have a member that is a reference, but it can have members of most other types, including, under the *new standard*, class types that have constructors or destructors. A `union` can specify protection labels to make members `public`, `private`, or `protected`. By default, like `struct`s, members of a `union` are `public`.
  >
  > A `union` may define member functions, including constructors and destructors. However, a `union` may not inherit from another class, nor may a `union` be used as a base class. As a result, a `union` may not have virtual functions.
  > 
  > <footer>C++ Primer (5th Edition), P991</footer>

1. 
  > **Using a `union` Type**
  >
  > The name of a `union` is a type name. Like the built-in types, by default unions are uninitialized. We can explicitly initialize a union in the same way that we can explicitly initialize aggregate classes by enclosing the initializer in a pair of curly braces:
  >
  > ```c++
  > // objects of type Token have a single member, which could be of any of the listed types
  > union Token {
  >     // members are public by default
  >     char cval;
  >     int ival;
  >     double dval;
  > };
  > 
  > Token first_token = {'a'};  // initializes the cval member
  > Token last_token;           // uninitialized Token object
  > Token *pt = new Token;      // pointer to an uninitialized Token object
  > ```
  >
  > If an initializer is present, it is used to initialize the first member. Hence, the initialization of `first_token` gives a value to its `cval` member.
  > 
  > <footer>C++ Primer (5th Edition), P992</footer>

1. 
  > An **anonymous `union`** is an unnamed `union` that does not include any declarations between the close curly that ends its body and the semicolon that ends the `union` definition. When we define an anonymous `union` the compiler automatically creates an unnamed object of the newly defined `union` type:
  >
  > ```c++
  > union {  // anonymous union
  >     char cval;
  >     int ival;
  >     double dval;
  > };  // defines an unnamed object, whose members we can access directly
  > cval = 'c';  // assigns a new value to the unnamed, anonymous union object
  > ival = 42;   // that object now holds the value 42
  > ```
  >
  > An anonymous `union` cannot have `private` or `protected` members, nor can an anonymous `union` define member functions.
  > 
  > <footer>C++ Primer (5th Edition), P993</footer>

1. 
  > **`union`s with Members of Class Type**
  >
  > Under earlier versions of C++, `union`s could not have members of a class type that defined its own constructors or copy-control members. Under the new standard, this restriction is lifted. However, `union`s with members that define their own constructors and/or copy-control members are more complicated to use than `union`s that have members of built-in type.
  >
  > **Using a Class to Manage `union` Members**
  >
  > ```c++
  > class Token {
  > public:
  >     // copy control needed because our class has a union with a string member
  >     // defining the move constructor and move-assignment operator is left as an exercise
  >     Token(): tok(INT), ival{0} { }
  >     Token(const Token &t): tok(t.tok) { copyUnion(t); }
  >     Token &operator=(const Token&);
  >     // if the union holds a string, we must destroy it; see § 19.1.2 (p. 824)
  >     ~Token() { if (tok == STR) sval.~string(); }
  >     // assignment operators to set the differing members of the union
  >     Token &operator=(const std::string&);
  >     Token &operator=(char);
  >     Token &operator=(int);
  >     Token &operator=(double);
  > private:
  >     enum {INT, CHAR, DBL, STR} tok;  // discriminant
  >     union {  // anonymous union
  >         char cval;
  >         int ival;
  >         double dval;
  >         std::string sval;
  >     };  // each Token object has an unnamed member of this unnamed union type
  >     // check the discriminant and copy the union member as appropriate
  >     void copyUnion(const Token&);
  > };
  >
  > Token &Token::operator=(int i) {
  >     if (tok == STR) sval.~string();  // if we have a string, free it
  >     ival = i;   // assign to the appropriate member
  >     tok = INT;  // update the discriminant
  >     return *this;
  > }
  >
  > Token &Token::operator=(const std::string &s) {
  >     if (tok == STR)  // if we already hold a string, just do an assignment
  >         sval = s;
  >     else
  >         new(&sval) string(s);  // otherwise construct a string
  >     tok = STR;  // update the discriminant
  >     return *this;
  > }
  >
  > void Token::copyUnion(const Token &t) {
  >     switch (t.tok) {
  >         case Token::INT: ival = t.ival; break;
  >         case Token::CHAR: cval = t.cval; break;
  >         case Token::DBL: dval = t.dval; break;
  >         // to copy a string, construct it using placement new; see (§ 19.1.2 (p. 824))
  >         case Token::STR: new(&sval) string(t.sval); break;
  >     }
  > }
  >
  > Token &Token::operator=(const Token &t) {
  >     // if this object holds a string and t doesn't, we have to free the old string
  >     if (tok == STR && t.tok != STR) sval.~string();
  >     if (tok == STR && t.tok == STR)
  >         sval = t.sval; // no need to construct a new string
  >     else
  >         copyUnion(t); // will construct a string if t.tok is STR
  >     tok = t.tok;
  >     return *this;
  > }
  > ```
  >
  > Because our `union` has a member with a destructor, we must define our own destructor to (conditionally) destroy the `string` member. Unlike ordinary members of a class type, class members that are part of a `union` are not automatically destroyed. The destructor has no way to know which type the `union`  holds, so it cannot know which member to destroy.
  > 
  > <footer>C++ Primer (5th Edition), P993-997</footer>

1. 
  > A class can be defined inside a function body. Such a class is called a **local class**.
  >
  > All members, including functions, of a local class must be completely defined inside the class body.
  >
  > Similarly, a local class is not permitted to declare static data members, there being no way to define them.
  > 
  > <footer>C++ Primer (5th Edition), P997-998</footer>

1. 
  > **Local Classes May Not Use Variables from the Function’s Scope**
  >
  > A local class can access only type names, `static` variables, and enumerators defined within the enclosing local scopes. A local class may not use the ordinary local variables of the function in which the class is defined:
  >
  > ```c++
  > int a, val;
  > void foo(int val)
  > {
  >     static int si;
  >     enum Loc { a = 1024, b };
  >     // Bar is local to foo
  >     struct Bar {
  >         Loc locVal;  // ok: uses a local type name
  >         int barVal;
  >         void fooBar(Loc l = a)  // ok: default argument is Loc::a
  >         {
  >             barVal = val;    // error: val is local to foo
  >             barVal = ::val;  // ok: uses a global object
  >             barVal = si;     // ok: uses a static local object
  >             locVal = b;      // ok: uses an enumerator
  >         }
  >     };
  >     // . . .
  > }
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P998</footer>

1. 
  > **Nested Local Classes**
  >
  > It is possible to nest a class inside a local class. In this case, the nested class definition can appear outside the local-class body. However, the nested class must be defined in the same scope as that in which the local class is defined.
  >
  > ```c++
  > void foo()
  > {
  >     class Bar {
  >     public:
  >         // ...
  >         class Nested;  // declares class Nested
  >     };
  >     // definition of Nested
  >     class Bar::Nested {
  >         // ...
  >     };
  > }
  > ```
  >
  > A class nested in a local class is itself a local class, with all the attendant restrictions. All members of the nested class must be defined inside the body of the nested class itself.
  > 
  > <footer>C++ Primer (5th Edition), P999</footer>

1. 
  > A class can define a (non`static`) data member as a **bit-field**. A bit-field holds a specified number of bits. Bit-fields are normally used when a program needs to pass binary data to another program or to a hardware device. The memory layout of a bit-field is machine dependent.
  >
  > A bit-field must have integral or enumeration type. Ordinarily, we use an `unsigned` type to hold a bit-field, because the behavior of a `signed` bit-field is implementation defined. We indicate that a member is a bit-field by following the member name with a colon and a constant expression specifying the number of bits:
  >
  > ```c++
  > typedef unsigned int Bit;
  > class File {
  >     Bit mode: 2;        // mode has 2 bits
  >     Bit modified: 1;    // modified has 1 bit
  >     Bit prot_owner: 3;  // prot_owner has 3 bits
  >     Bit prot_group: 3;  // prot_group has 3 bits
  >     Bit prot_world: 3;  // prot_world has 3 bits
  >     // operations and data members of File
  > public:
  >     // file modes specified as octal literals; see § 2.1.3 (p. 38)
  >     enum modes { READ = 01, WRITE = 02, EXECUTE = 03 };
  >     File &open(modes);
  >     void close();
  >     void write();
  >     bool isRead() const;
  >     void setWrite();
  > };
  > ```
  >
  > Bit-fields defined in consecutive order within the class body are, if possible, packed within adjacent bits of the same integer, thereby providing for storage compaction. For example, in the preceding declaration, the five bit-fields will (probably) be stored in a single `unsigned int`. Whether and how the bits are packed into the integer is machine dependent.
  >
  > The address-of operator (`&`) cannot be applied to a bit-field, so there can be no pointers referring to class bit-fields.
  > 
  > <footer>C++ Primer (5th Edition), P1000</footer>

1. 
  > **`volatile` Qualifier**
  >
  > Programs that deal directly with hardware often have data elements whose value is controlled by processes outside the direct control of the program itself. For example, a program might contain a variable updated by the system clock. An object should be declared **`volatile`** when its value might be changed in ways outside the control or detection of the program. The `volatile` keyword is a directive to the compiler that it should not perform optimizations on such objects.
  >
  > ```c++
  > volatile int display_register;  // int value that might change
  > volatile Task *curr_task;       // curr_task points to a volatile object
  > volatile int iax[max_size];     // each element in iax is volatile
  > volatile Screen bitmapBuf;      // each member of bitmapBuf is volatile
  > ```
  >
  > In the same way that a class may define `const` member functions, it can also define member functions as `volatile`. Only `volatile` member functions may be called on `volatile` objects.
  > 
  > <footer>C++ Primer (5th Edition), P1001-1002</footer>

1. 
  > We can declare pointers that are `volatile`, pointers to `volatile` objects, and pointers that are `volatile` that point to `volatile` objects:
  >
  > ```c++
  > volatile int v;     // v is a volatile int
  > int *volatile vip;  // vip is a volatile pointer to int
  > volatile int *ivp;  // ivp is a pointer to volatile int
  > // vivp is a volatile pointer to volatile int
  > volatile int *volatile vivp;
  > int *ip = &v;  // error: must use a pointer to volatile
  > *ivp = &v;     // ok: ivp is a pointer to volatile
  > vivp = &v;     // ok: vivp is a volatile pointer to volatile
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P1002</footer>

1. 
  > **Synthesized Copy Does Not Apply to `volatile` Objects**
  >
  > One important difference between the treatment of `const` and `volatile` is that the synthesized copy/move and assignment operators cannot be used to initialize or assign from a `volatile` object. The synthesized members take parameters that are references to (non`volatile`) `const`, and we cannot bind a non`volatile` reference to a `volatile` object.
  >
  > If a class wants to allow `volatile` objects to be copied, moved, or assigned, it must define its own versions of the copy or move operation.
  >
  > ```c++
  > class Foo {
  > public:
  >     Foo(const volatile Foo&);  // copy from a volatile object
  >     // assign from a volatile object to a nonvolatile object
  >     // assign from a volatile object to a volatile object
  >     Foo& operator=(volatile const Foo&);
  >     Foo& operator=(volatile const Foo&) volatile;
  >     // remainder of class Foo
  > };
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P1002-1003</footer>

1. 
  > C++ uses **linkage directives** to indicate the language used for any non-C++ function.
  >
  > ```c++
  > // illustrative linkage directives that might appear in the C++ header <cstring>
  > // single-statement linkage directive
  > extern "C" size_t strlen(const char *);
  > 
  > // compound-statement linkage directive
  > extern "C" {
  >     int strcmp(const char*, const char*);
  >     char *strcat(char*, const char*);
  > }
  > ```
  >
  > The string literal indicates the language in which the function is written. A compiler is required to support linkage directives for C. A compiler may provide linkage specifications for other languages, for example, `extern "Ada"`, `extern "FORTRAN"`, and so on.
  > 
  > <footer>C++ Primer (5th Edition), P1003-1004</footer>

1. 
  > **Pointers to `extern "C"` Functions**
  >
  > The language in which a function is written is part of its type. Hence, every declaration of a function defined with a linkage directive must use the same linkage directive. Moreover, pointers to functions written in other languages must be declared with the same linkage directive as the function itself: Code:
  >
  > ```c++
  > // pf points to a C function that returns void and takes an int
  > extern "C" void (*pf)(int);
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P1004-1005</footer>

1. 
  > **Linkage Directives Apply to the Entire Declaration**
  >
  > When we use a linkage directive, it applies to the function and any function pointers used as the return type or as a parameter type:
  >
  > ```c++
  > // f1 is a C function; its parameter is a pointer to a C function
  > extern "C" void f1(void(*)(int));
  > ```
  >
  > Because a linkage directive applies to all the functions in a declaration, we must use a type alias if we wish to pass a pointer to a C function to a C++ function:
  >
  > ```c++
  > // FC is a pointer to a C function
  > extern "C" typedef void FC(int);
  > // f2 is a C++ function with a parameter that is a pointer to a C function
  > void f2(FC *);
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P1005-1006</footer>

1. 
  > **Exporting Our C++ Functions to Other Languages**
  >
  > By using the linkage directive on a function definition, we can make a C++ function available to a program written in another language:
  >
  > ```c++
  > // the calc function can be called from C programs
  > extern "C" double calc(double dparm) { /* ... */ }
  > ```
  >
  > When the compiler generates code for this function, it will generate code appropriate to the indicated language.
  >
  > **Preprocessor Support for Linking to C**
  >
  > To allow the same source file to be compiled under either C or C++, the preprocessor defines `__cplusplus` (two underscores) when we compile C++. Using this variable, we can conditionally include code when we are compiling C++:
  >
  > ```c++
  > #ifdef __cplusplus
  > // ok: we're compiling C++
  > extern "C"
  > #endif
  > int strcmp(const char*, const char*);
  > ```
  > 
  > <footer>C++ Primer (5th Edition), P1006</footer>
