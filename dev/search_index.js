var documenterSearchIndex = {"docs":
[{"location":"Tutorial.html#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"In order to see the capabilities and how to generate and run models, we will consider a real example from the field of life sciences Saiz 2020.","category":"page"},{"location":"Tutorial.html#Uploading-the-package","page":"Tutorial","title":"Uploading the package","text":"","category":"section"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"We start uploading the package.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"using AgentBasedModels","category":"page"},{"location":"Tutorial.html#Creating-an-empty-model","page":"Tutorial","title":"Creating an empty model","text":"","category":"section"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"The first step for creating any model is to create and empty Model structure.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"model = Model()","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"In this model we will incorporate all the pieces of the final Agent Based Model. This structure helps to add pieces to the model in a constructive manner helping to constructively create modules.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"Schamatically, in the agent based model in the Saiz 2020 has three subparts:","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"It has mechanics, leading to movement in the cells.\nIt has a chemical interactions, leading to exchange of concentrations.\nIt has division events representing the growing organism.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"We will go contruct the model in three separated sections.","category":"page"},{"location":"Tutorial.html#Adding-mechanics","page":"Tutorial","title":"Adding mechanics","text":"","category":"section"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"The dynamics of the cells follow the following equations.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"m_ifracdv_idt =-bv_i+sum_j F_ij","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"fracdx_idt =v_i","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"where the force is","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"F_ij=\nbegincases\nF_0(fracr_ijd-1)(fracmu r_ijd-1)frac(x_i-x_j)dhspace1cmtextifdmu r_ij\n0hspace48cmtextotherwise\nendcases","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"If we observe, the model has five different types of terms:","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"Global parameters (b,F_0,mu): These are parameters that will be shared among all the agent in the model.\nLocal parameters (m_i): These are parameters that vary between cells.\nPairwise interactions (F_ij,d_ij,r_ij): This are terms that come from the pairwise interaction between two agents.\nInteraction parameters (sum_j F_ij): These are parameters that are computed as a sum of all pairwise interactions from one agent to the rest.\nVariables (v_i,x_i): These are the variables of the dynamical system.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"Once we have identified all the contributions, we will proceed to declare all the terms in the model.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"First, we introduce the global variables [1].  It is possible to intriduce all of them at one:","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":" addGlobal!(model,[:b,:F₀,:μ])","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"Then we will define the local parameters.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":" addLocal!(m,[:m,:r])","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"An then the interaction parameters. It is important to notice that we only declare the interacting parameters, that are the sum over all the neighbours of each agent. The pariwise interactions are not usually of interest and having a list of the contributions of each pair would require a lo of memory. Hence, we compute them only to store them in the pariwise interaction terms.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":" interaction = \n \"\n #Define the pairwise distance\n dₐ = sqrt((x₁-x₂)^2+(y₁-y₂)^2+(z₁-z₂)^2)\n #Define the radius sum\n rrₐ = r₁+r₂                              \n #Define the force components under the condition\n if dₐ < μ*rrₐ && dₐ > 0. #Make sure that the force avoids itself or it will diverge \n     Fx₁ += F₀*(rrₐ/dₐ-1)*(μ*rrₐ/dₐ-1)*(x₁-x₂)/dₐ #sum_j F_ij for the x component\n     Fy₁ += F₀*(rrₐ/dₐ-1)*(μ*rrₐ/dₐ-1)*(y₁-y₂)/dₐ\n     Fz₁ += F₀*(rrₐ/dₐ-1)*(μ*rrₐ/dₐ-1)*(z₁-z₂)/dₐ\n else #This is not really necessary but we include it in the example for shake of completeness\n     Fx₁ += 0.\n     Fy₁ += 0.\n     Fz₁ += 0.\n end\n \"\n addInteraction!(m,[:Fx,:Fy,:Fz],interaction)","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"Finally, we will have to include the variables and their dynamical equations.","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"eqs = \n#Define the dynamic equations\neqs=\n\"\ndvx = (-b*vx/m+Fx/m)*dt\ndvy = (-b*vy/m+Fy/m)*dt\ndvz = (-b*vz/m+Fz/m)*dt\ndx = vx*dt\ndy = vy*dt\ndz = vz*dt\n\"\naddVariable!(m,[:vx,:vy,:vz,:x,:y,:z],eqs)","category":"page"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"And that is it. We have included the dynamical equations to the model.","category":"page"},{"location":"Tutorial.html#Testing-the-model-so-far","page":"Tutorial","title":"Testing the model so far","text":"","category":"section"},{"location":"Tutorial.html","page":"Tutorial","title":"Tutorial","text":"[1]: The order in which you declare the different parameters and variables is indiferent.","category":"page"},{"location":"APIdevelopers.html#API-for-Developers","page":"API for Developers","title":"API for Developers","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"CurrentModule = AgentBasedModels","category":"page"},{"location":"APIdevelopers.html#Auxiliar-functions","page":"API for Developers","title":"Auxiliar functions","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"This is a compendium of handful functions that are used all the time during the adaptation of the rest of the models.","category":"page"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"platformAdapt\nvectParams\nadapt\npushAdapt!\naddIfNot!\ncheckDeclared\nclean\ncommonArguments\nfindSymbol\nsplits\nsplitEqs\nsubs\nparameterAdapt","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.platformAdapt","page":"API for Developers","title":"AgentBasedModels.platformAdapt","text":"Function to adapt block of code into the CPU of GPU platforms.\n\nArguments\n\ntext (String, Expr, Array{String}, Array{Expr}) Block of code to adapt.\n\nOptional keyword arguments\n\nplatform (String) Platform to be adapted. Options are \"cpu\" (default) or \"gpu\".\n\nReturns\n\nExpr or Array{Expr}\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.vectParams","page":"API for Developers","title":"AgentBasedModels.vectParams","text":"Function to vectorize the variables in a block of code.\n\nArguments\n\nagentModel (Model) Model that is being compiled.\ntext (String, Expr, Array{String}, Array{Expr}) Block(s) of code to be vectorized according to the parameters stored in the agentModel.\n\nReturns\n\nExpr or Array{Expr}\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.adapt","page":"API for Developers","title":"AgentBasedModels.adapt","text":"Function that performs the vectParams, neighbourhAdapt and platformAdapt in succession.\n\nArguments\n\nagentModel (Model) Model that is being compiled.\ntext (String, Expr) Expression or expressions to be vectorized according to the parameters stored in the agentModel.\nplatform (String) Platform to be adapted. Options are \"cpu\" (default) or \"gpu\".\n\nReturns\n\nExpr\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.pushAdapt!","page":"API for Developers","title":"AgentBasedModels.pushAdapt!","text":"Function that pushes in a container a text after adaptation.\n\nArguments\n\ncontainer (Array) Array where the adapted object is stored\nagentModel (Model) Model that is being compiled.\ntext (String, Expr) Expression or expressions to be vectorized according to the parameters stored in the agentModel.\nplatform (String) Platform to be adapted. Options are \"cpu\" (default) or \"gpu\".\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.addIfNot!","page":"API for Developers","title":"AgentBasedModels.addIfNot!","text":"Add an element if it is not present in an Array\n\nArguments\n\ncontainer (Array) Container where to introduce the elements\nobject (Any or Array{Any}) Array of elements\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.checkDeclared","page":"API for Developers","title":"AgentBasedModels.checkDeclared","text":"Function that checks if an Symbol has already been declared in the model and returns an error if it is duplicated.\n\nArguments\n\nagentModel (Model) Agent Model\ns (Symbol, Array{Symbol}) Symbol(s) to be checked for duplicated declaration.\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.clean","page":"API for Developers","title":"AgentBasedModels.clean","text":"Cleans a complex expression. It is very helpful for debuging the compiled model evolve function after parsing everything.\n\nArguments\n\na (Expr) Expression to be cleaned\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.commonArguments","page":"API for Developers","title":"AgentBasedModels.commonArguments","text":"Returns list of all vectorized parameters of the model added by basic functions.\n\nArguments\n\nagentModel (Model) Agent Model\n\nOptional keywork Arguments\n\nrandom (Bool) If true (default), returns also symbols for the vectorized random variables.\n\nReturn\n\nArray{Symbol}\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.findSymbol","page":"API for Developers","title":"AgentBasedModels.findSymbol","text":"Check if a symbol or expression is present in a block of code\n\nArguments\n\nexp (Expr, String) Block of code where to check for the symbol\nob (Symbol or Expr) Symbol or Expression to look for in the block of code\n\nReturns\n\nBool\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.splits","page":"API for Developers","title":"AgentBasedModels.splits","text":"Recurrent function auxiliar to the splitEqs for the block of code adaptation\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.splitEqs","page":"API for Developers","title":"AgentBasedModels.splitEqs","text":"Prepares a block of code with differential equations to be vectorized and introduced in the integration algorithms.  Returns the adapted block of code and the list of the lines where there has been declared a Wienner random variable.\n\nArguments\n\nvalue (Expr) Block of code with differential equations\n\nReturns\n\nExpr, Array{Int} \n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.subs","page":"API for Developers","title":"AgentBasedModels.subs","text":"Substitution of a symbol by another symbol in a block of code.\n\nArguments\n\nexp (String, Expr, Array{String}, Array{Expr}) Block of code where to substitute the symbol\nob (String, Expr, Array{String}, Array{Expr}) Object to be substituted\ntar (String, Expr, Array{String}, Array{Expr}) Target by which is substituted, it must have the same type than ob.\n\nReturns\n\nExpr or Array{Expr}\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.parameterAdapt","page":"API for Developers","title":"AgentBasedModels.parameterAdapt","text":"function parameterAdapt(agentModel::Model,inLoop,arg;platform::String=\"cpu\",nChange_=false)\n\nFunction that returns the pieces of the final compiling code for the parameters adapted to the corresponding platform:  \n\narrays to declare containg the parameters declared\nfunctions for parameter updates\nexecution lines\n\nParameters:\n\nagentModel : Model structure\ninLoop : Code of the interaction local to be adapted depending on the neighbborhood\narg : Additional arguments required by the functions\nplatform : Platform to be adapted (\"cpu\" or \"gpu\")\nnChange_ : FILL THE GAP\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#Precompilation","page":"API for Developers","title":"Precompilation","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"precompile!","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.precompile!","page":"API for Developers","title":"AgentBasedModels.precompile!","text":"Main function that plugs in all the declared parts of the Agent Based Model and generates an evolution function. It is exactly the same as the compile function but it evals in the local scope of the module. Used for compilationof the predefined models of the library.\n\nArguments\n\nagentModel (Model) Agent Model to be compiled.\n\nOptative keywork arguments\n\nintegrator (String) Integrator to be implemented in the model (\"euler\" by default)\nsaveRAM (Bool) Indicate if the steps have to be saved in a CommunityInTime structure. False by default.\nsaveVTK (Bool) Indicate if the steps have to be saved in a VTK file (experimental). False by default.\npositionsVTK (Array{Symbols}) The declared symbols that will correspond to the VTK spatial positions. [:x,:y,:z] by default.\ndebug (Bool) Print the cleaned compiled function for debugging purposes. False by default.\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#Set-neighbourhood","page":"API for Developers","title":"Set neighbourhood","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"All the neighborhood types X share the same structure. They contain always four elements:","category":"page"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"A NeighborhoodX structure that keeps all the required elements in order to define the neighborhood. This structured is created when calling the setNeighborhoodX! and added to the model.\nThe setNeighborhoodX! function that is the high level function for seting a neighborhood. The details are present in the API.\nA neighboursX function that is runned during compilation time and creates the functions that computed to make the neighborhoods.\nA neighboursXAdapt that assigns the inner loop iterator :nnic2_ into the appropiate term depending on the neighborhood type.","category":"page"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"Functions defined in 2 and 4 have always the same inputs and outputs.","category":"page"},{"location":"APIdevelopers.html#Full-connected","page":"API for Developers","title":"Full connected","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"NeighboursFull\nneighboursFull\nneighboursFullAdapt","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.NeighboursFull","page":"API for Developers","title":"AgentBasedModels.NeighboursFull","text":"struct NeighboursFull <: Neighbours\n\n\n\n\n\n","category":"type"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursFull","page":"API for Developers","title":"AgentBasedModels.neighboursFull","text":"function neighboursFull(agentModel::Model;platform=\"cpu\")\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursFullAdapt","page":"API for Developers","title":"AgentBasedModels.neighboursFullAdapt","text":"function neighboursFullAdapt(entry)\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#By-Adjacecy","page":"API for Developers","title":"By Adjacecy","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"NeighboursAdjacency\nneighboursByAdjacency\nneighboursByAdjacencyAdapt","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.NeighboursAdjacency","page":"API for Developers","title":"AgentBasedModels.NeighboursAdjacency","text":"struct NeighboursAdjacency <: Neighbours\n\n\n\n\n\n","category":"type"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursByAdjacency","page":"API for Developers","title":"AgentBasedModels.neighboursByAdjacency","text":"function neighboursByAdjacency(agentModel::Model;platform=\"cpu\")\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursByAdjacencyAdapt","page":"API for Developers","title":"AgentBasedModels.neighboursByAdjacencyAdapt","text":"function neighboursByAdjacencyAdapt(entry)\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#By-Grid","page":"API for Developers","title":"By Grid","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"NeighboursGrid\nneighboursByGrid\nneighboursByGridAdapt\nloopNeighbourGridCreation","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.NeighboursGrid","page":"API for Developers","title":"AgentBasedModels.NeighboursGrid","text":"struct NeighboursGrid <: Neighbours\n\n\n\n\n\n","category":"type"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursByGrid","page":"API for Developers","title":"AgentBasedModels.neighboursByGrid","text":"function neighboursByGrid(agentModel::Model;platform=\"cpu\")\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.neighboursByGridAdapt","page":"API for Developers","title":"AgentBasedModels.neighboursByGridAdapt","text":"function neighboursByGridAdapt(entry)\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.loopNeighbourGridCreation","page":"API for Developers","title":"AgentBasedModels.loopNeighbourGridCreation","text":"function loopNeighbourGridCreation(i,i0,n,x=nothing,pos=\"\")\n\nAuxiliar function for creating nested loops during the grid creation.\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#Integrators","page":"API for Developers","title":"Integrators","text":"","category":"section"},{"location":"APIdevelopers.html","page":"API for Developers","title":"API for Developers","text":"integratorEuler\nintegratorHeun","category":"page"},{"location":"APIdevelopers.html#AgentBasedModels.integratorEuler","page":"API for Developers","title":"AgentBasedModels.integratorEuler","text":"Adaptation to the Euler integrator in Îto prescription.\n\nx(t+Δt) = x(t) + f(x(t)t)*Δt + g(x(t)t)ΔW\n\nwhere ΔW is a Wiener process with step proportional to Δt^12.\n\nArguments\n\nagentModel (Model) Agent Model\ninLoop (Expr) Block of code that will be included in the integration step.\narg (Array{Symbol} Additional arguments to include from the neighborhood.\n\nOptatiove keywork arguments\n\nplatform (String) Platform to be adapted the algorithm. \"cpu\" by default\n\n\n\n\n\n","category":"function"},{"location":"APIdevelopers.html#AgentBasedModels.integratorHeun","page":"API for Developers","title":"AgentBasedModels.integratorHeun","text":"Adaptation to the Stochastic Improved Euler integrator in Îto prescription.\n\nK₁ = f(x(t)t)*Δt + g(x(t)t)(ΔW-S Δt^12 )\n\nK₂ = f(x(t)+K₁t+Δt)*Δt + g(x(t)+K₁t+Δt)(ΔW+SΔt^12 )\n\nx(t+Δt) = x(t) + (K₁+K₂)2\n\nwhere S is a random variable chosen to be ±1 with probability 1/2 and  ΔW is a Wiener process with step proportional to Δt^12.\n\nArguments\n\nagentModel (Model) Agent Model\ninLoop (Expr) Block of code that will be included in the integration step.\narg (Array{Symbol} Additional arguments to include from the neighborhood.\n\nOptatiove keywork arguments\n\nplatform (String) Platform to be adapted the algorithm. \"cpu\" by default\n\n\n\n\n\n","category":"function"},{"location":"index.html","page":"Home","title":"Home","text":"The AgentBasedModels.jl package aims to help fast designing and simulation of Agent Based models.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The following dynamical methods can be implemented in the model:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"ODEs\nSDEs","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Additionally, the package incorporates special functions as:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Division events\nDeath events\nRandomly selected pairwise interactions","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The created models can run the simulations both in CPU and CUDA GPU thanks to the CUDA.jl. The possibility to run in the simulations in GPU makes it possible to run in a resonable time simulations with a huge number of particles.","category":"page"},{"location":"index.html#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Two options to install de package.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Pkg.add(\"AgentBasedModels\")","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"or clone it from the repository.","category":"page"},{"location":"index.html#Requirements-and-Optional-Modules","page":"Home","title":"Requirements and Optional Modules","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"The current version of AgentModel.jl requires the following packages:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Random >= 1.5\nDistributions >= 1.6","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Up to the current state of ourknowledge, it is not possible to include optional packages in Julia. In case that the simulations want to be performed in GPU, the package CUDA.jl should be installed aditionally,","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"CUDA = 1.5","category":"page"},{"location":"API.html#API","page":"API","title":"API","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"CurrentModule = AgentModel","category":"page"},{"location":"API.html#Model","page":"API","title":"Model","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"Model","category":"page"},{"location":"API.html#AgentBasedModels.Model","page":"API","title":"AgentBasedModels.Model","text":"mutable struct Model\n\nBasic structure which contains the agent based model.\n\nExamples\n\nm = Model(); #Create empty model\n\naddGlobal!(m,:x); #Add a global variable to the model\n# Here there may be many more additions\n\n\n\n\n\n","category":"type"},{"location":"API.html#Add-Parameters","page":"API","title":"Add Parameters","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"addGlobal!\naddLocal!\naddLocalInteraction!\naddVariable!\naddInteraction!","category":"page"},{"location":"API.html#AgentBasedModels.addGlobal!","page":"API","title":"AgentBasedModels.addGlobal!","text":"function addGlobal!(agentModel::Model, addvar::Symbol; updates=\"\", randVar = Tuple{Symbol,String}[])\n\nAdd a global variable to the model with optional update rules.\n\nExamples\n\nm = Model();\n\naddGlobal!(m,:x);\n\nm = Model();\nupdate = \"\nx= r #r is a random variable with μ=0. and σ=1.\n\"\n\naddGlobal!(m,:x,updates=update,randVar=[(:r,Normal(0.,1.))]);\n\n\n\n\n\nfunction addGlobal!(agentModel::Model, addvar::Array{Symbol}; updates=\"\", randVar = Tuple{Symbol,String}[])\n\nAdd a set of global variables to the model with optional update rules.\n\nExamples\n\nm = Model();\n\naddGlobal!(m,[:x,:y]);\n\nm = Model();\nupdate = \" #We update x but not y\nx= r\n\"\n\naddGlobal!(m,[:x,:y],updates=update,randVar=[(:r,Normal,0,1)]);\n\n\n\n\n\n","category":"function"},{"location":"API.html#AgentBasedModels.addLocal!","page":"API","title":"AgentBasedModels.addLocal!","text":"addLocal!(agentModel::Model, addvar::Symbol; updates=\"\", randVar = Tuple{Symbol,String}[])\n\nAdd a local variable to the model with optional update rules.\n\nExamples\n\nm = Model();\n\naddLocal!(m,:x);\n\nm = Model();\nupdate = \"\nx= r #r is a random variable with μ=0. and σ=1.\n\"\n\naddLocal!(m,:x,updates=update,randVar=[(:r,Normal,0.,1.)]);\n\n\n\n\n\naddLocal!(agentModel::Model, addvar::Array{Symbol}; updates=\"\", randVar = Tuple{Symbol,String}[])\n\nAdd a local variable to the model with optional update rules.\n\nExamples\n\nm = Model();\n\naddGlobal!(m,[:x,:y]);\n\nm = Model();\nupdate = \" #We update x but not y\nx= r\n\"\n\naddGlobal!(m,[:x,:y],updates=update,randVar=[(:r,Normal,0,1)]);\n\n\n\n\n\n","category":"function"},{"location":"API.html#AgentBasedModels.addLocalInteraction!","page":"API","title":"AgentBasedModels.addLocalInteraction!","text":"function addLocalInteraction!(agentModel::Model, addvar::Symbol, addeqs::String; randVar = Tuple{Symbol,String}[])\n\nAdd a local interaction to the model.\n\nExamples\n\nm = Model();\naddLocal!(m,[:x,:y]);\n\n\ninteraction = \"\nd₁ = sqrt((x₁-x₂)^2+(y₁-y₂)^2)\n\"\naddLocalInteraction!(m,:d,interaction);\n\n\n\n\n\nfunction addLocalInteraction!(agentModel::Model, addvar::Symbol, addeqs::String; randVar = Tuple{Symbol,String}[])\n\nAdd a local interaction to the model.\n\nExamples\n\nm = Model();\naddLocal!(m,[:x,:y]);\n\n\ninteraction = \"\nd₁ = sqrt((x₁-x₂)^2+(y₁-y₂)^2)\ndAbs₁ = abs(x₁-x₂)+abs(y₁-y₂)\n\"\naddLocalInteraction!(m,[:d,:dAbs],interaction);\n\n\n\n\n\n","category":"function"},{"location":"API.html#AgentBasedModels.addVariable!","page":"API","title":"AgentBasedModels.addVariable!","text":"function addVariable!(agentModel::Model, addvar::Symbol, addeqs::String)\n\nAdd a variable described by an Ordinary or Stochastic Differential Equation.\n\nExamples\n\nm = Model();\neq = \"\ndxdt = -x #Exponential decay\n\"\naddVariable!(m,:x,eq);\n\nm = Model();\neq = \"\ndxdt = -x+ξ #Wiener process\n\"\naddVariable!(m,:x,eq);\n\n\n\n\n\nfunction addVariable!(agentModel::Model, addvar::Symbol, addeqs::String)\n\nAdd a variable described by an Ordinary or Stochastic Differential Equations.\n\nExamples\n\nm = Model();\neq = \"\ndxdt = -x #Exponential decay\ndydt = -y + ξ #Wiener process\n\"\naddVariable!(m,[:x,:y],eq);\n\n\n\n\n\n","category":"function"},{"location":"API.html#AgentBasedModels.addInteraction!","page":"API","title":"AgentBasedModels.addInteraction!","text":"function addInteraction!(agentModel::Model, addvar::Symbol, addeqs::String)\n\nAdd a interaction parameters to the model. Differently to the local interactions, this parameters will be updated inside the integration steps of the differential equations.\n\nExamples\n\nm = Model();\neq = \"\ndxdt = -x+g*ξ #Wiener process with an additional interaction\n\"\naddVariable!(m,:x,eq);\n\ninteraction = \"\ng₁ += 1./sqrt((x₁-x₂)^2+(y₁-y₂)^2) #The difussion will be affected by the presence of other particles around them.\n\"\naddInteraction!(m,:g,interaction);\n\n\n\n\n\nfunction addInteraction!(agentModel::Model, addvar::Symbol, addeqs::String)\n\nAdd a interaction parameters to the model. Differently to the local interactions, this parameters will be updated inside the integration steps of the differential equations.\n\nExamples\n\nm = Model();\neq = \"\ndxdt = -x+g*ξ+p #Wiener process with an additional interaction\n\"\naddVariable!(m,:x,eq);\n\n\ninteraction = \"\ng₁ += 1./sqrt((x₁-x₂)^2+(y₁-y₂)^2) #The difussion will be affected by the presence of other particles around them.\np₁ += 1./(abs(x₁-x₂)+abs(y₁-y₂)) #The difussion will be affected by the presence of other particles around them.\n\"\naddInteraction!(m,[:g,:p],interaction);\n\n\n\n\n\n","category":"function"},{"location":"API.html#Special","page":"API","title":"Special","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"addDivision!\naddPseudopode!","category":"page"},{"location":"API.html#AgentBasedModels.addDivision!","page":"API","title":"AgentBasedModels.addDivision!","text":"function addDivision!(agentModel::Model, condition::String, update::String; randVar = Tuple{Symbol,String}[])\n\nFunction that adds a division process of the particles to the model. Cells divide under condition and update the new parameters with update.\n\nExamples\n\nm = Model();\naddLocal!(m,[:g,:tDiv]); #Add two local variables, g and the time of division tDiv\n\ncondition = \n\"\ntDiv < t\n\"\n\nupdate =\n\"\ng₁ = gₚ*r #Asymmetric split of the component between the two daughter particles\ng₁ = tDivₚ+1.\n\ng₂ = gₚ*(1-r)\ng₂ = tDivₚ+1.\n\"\n\naddDivision!(m,condition,update,randVar=[(:r,\"Uniform\",0.,1.)])\n\n\n\n\n\n","category":"function"},{"location":"API.html#AgentBasedModels.addPseudopode!","page":"API","title":"AgentBasedModels.addPseudopode!","text":"function addPseudopode!(agentModel::Model, var::Symbol, tVar::Symbol, neighbourCondition::String, force::String, updateChange::String; randVar = Tuple{Symbol,String}[])\n\nAdd a pseudopode force.\n\nExamples\n\nm = Model()\naddLocal!([:x,:y])\n\nneighbourCondition = \n\"\nsqrt((x₁-x₂)^2+(y₁-y₂)^2) < 2.\n\"\nforce = \n\"\nf = sqrt((x₁-x₂)^2+(y₁-y₂)^2)*exp(-sqrt((x₁-x₂)^2+(y₁-y₂)^2))\n\"\nupdateChange = \n\"\ntPseudo = t + σPseudo\n\"\naddPseudopode!(m, :f, :tPseudo, condition, force, updateChange, randVar = [(:σPseudo,\"Uniform\",1.,2.)])\n\n\n\n\n\n","category":"function"},{"location":"API.html#Neighborhoods","page":"API","title":"Neighborhoods","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"setNeighborhoodFull!\nsetNeighborhoodAdjacency!\nsetNeighborhoodGrid!","category":"page"},{"location":"API.html#Compile","page":"API","title":"Compile","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"compile!","category":"page"},{"location":"API.html#AgentBasedModels.compile!","page":"API","title":"AgentBasedModels.compile!","text":"Main function that plugs in all the declared parts of the Agent Based Model and generates an evolution function.\n\nArguments\n\nagentModel (Model) Agent Model to be compiled.\n\nOptative keywork arguments\n\nintegrator (String) Integrator to be implemented in the model (\"euler\" by default)\nsaveRAM (Bool) Indicate if the steps have to be saved in a CommunityInTime structure. False by default.\nsaveVTK (Bool) Indicate if the steps have to be saved in a VTK file (experimental). False by default.\npositionsVTK (Array{Symbols}) The declared symbols that will correspond to the VTK spatial positions. [:x,:y,:z] by default.\ndebug (Bool) Print the cleaned compiled function for debugging purposes. False by default.\n\nReturns\n\nnothing\n\n\n\n\n\n","category":"function"},{"location":"API.html#Community","page":"API","title":"Community","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"Community\nCommunityInTime","category":"page"},{"location":"API.html#AgentBasedModels.Community","page":"API","title":"AgentBasedModels.Community","text":"Basic structure keeping the parameters of all the agents in the current simulation of a model.\n\nElements\n\nt::AbstractFloat Time of the community\nN::Int Number of particles in the community\ndeclaredSymb::Dict{String,Array{Symbol}} Dictionary storing the names of all the parameters declared in model according to the respective fields where they have been declared.\nvar::Array{AbstractFloat,2} 2D Array with all the agents in rows and all the corresponding values of the variables in columns.\ninter::Array{AbstractFloat,2} 2D Array with all the agents in rows and all the corresponding values of the interaction parameters in columns.\nloc::Array{AbstractFloat,2} 2D Array with all the agents in rows and all the corresponding values of the local parameters in columns.\nlocInter::Array{AbstractFloat,2} 2D Array with all the agents in rows and all the corresponding values of the local interaction parameters in columns.\nglob::Array{AbstractFloat,2} 2D Array with all the agents in rows and all the corresponding values of the global parameters in columns.\nids::Array{Int,2} 2D Array with all the agents in rows and all the corresponding values of the identities in columns\n\nConstructors\n\nfunction Community(agentModel::Model; N::Int=1, t::AbstractFloat=0.)\n\nArguments\n\nagentModel (Model) Agent Model structure\n\nAdditional keyword arguments\n\nN (Int) Number of Agent with wich start the model. N=1 by default.\nt (AbstractFloat) Time of the community at creation. t=1. by default\n\nExample\n\n julia> model = Model();\n julia> addLocal!(model,:x);\n julia> community = Community(model, N=2, t=0.5)\n Community(0.5, 2, Dict{String,Array{Symbol,N} where N}(\"glob\" => [],\"ids\" => [],\"locInter\" => [],\"loc\" => [:x],\"inter\" => [],\"var\" => []), Array{AbstractFloat}(undef,2,0), Array{AbstractFloat}(undef,2,0), AbstractFloat[0.0; 0.0], AbstractFloat[0.0; 0.0], AbstractFloat[], Array{Int64}(undef,2,0))\n julia> community.N\n 2\n julia> community.t\n 0.5\n julia> community.declaredSymb\n Dict{String,Array{Symbol,N} where N} with 6 entries:\n   \"glob\"     => Symbol[]\n   \"ids\"      => Symbol[]\n   \"locInter\" => Symbol[]\n   \"loc\"      => [:x]\n   \"inter\"    => Symbol[]\n   \"var\"      => Symbol[]\n\nBase extended methods\n\nIn addition for directly accessing the elements of the structure, the following methods from the Base Package has been extended to access the elements of the Community.\n\nfunction Base.getindex(a::Community,var::Symbol)\n\nReturns an array with all the values of the declared symbol for all the agents.\n\nExample\n\n julia> model.N\n 2\n julia> community.declaredSymb[\"loc\"]\n 1-element Array{Symbol,1}:\n :x\n julia> community[:x]\n 2-element Array{AbstractFloat,1}:\n  0.0\n  0.0\n\nfunction Base.setindex!(a::Community,v::Array{<:AbstractFloat},var::Symbol)\n\nSets the values of a declared symbol to the values of the array v. The array has to be the same length as N.\n\nExample\n\n julia> community[:x] = [1.,2.];\n julia> community[:x]\n 2-element Array{Float64,1}:\n  1.0\n  2.0\n\nfunction Base.setindex!(a::Community,v::Number,var::Symbol)\n\nSets the values of a declared symbol to the given value v.\n\nExample\n\njulia> community[:x] = 2.;\njulia> community[:x]\n2-element Array{Float64,1}:\n 2.0\n 2.0\n\n\n\n\n\n","category":"type"},{"location":"API.html#AgentBasedModels.CommunityInTime","page":"API","title":"AgentBasedModels.CommunityInTime","text":"Structure that basically stores an array of Coomunities at different time points.\n\nElements\n\ncom (Array{Community}) Array where the communities are stored\n\nConstructors\n\nfunction CommunityInTime()\n\nInstantiates an empty CommunityInTime folder.\n\nBase extended methods\n\nfunction Base.push!(a::CommunityInTime,c::Community)\n\nAdds one Community element to the CommunityInTime object.\n\nfunction Base.length(a::CommunityInTime)\n\nReturns the number of time points of the Community in time.\n\nfunction Base.getindex(a::CommunityInTime,var::Int)\nfunction Base.firstindex(a::CommunityInTime,var::Int)\nfunction Base.lastindex(a::CommunityInTime,var::Int)\n\nReturns the Community of the corresponding entry.\n\nfunction Base.getindex(a::CommunityInTime,var::Symbol)\n\nReturns a 2D array with rows being the agents and the rows the timepoints. If the agent did not existed for certain time point, the extry is filled with a NaN value.\n\n\n\n\n\n","category":"type"},{"location":"API.html#Initialisation-functions","page":"API","title":"Initialisation functions","text":"","category":"section"},{"location":"API.html","page":"API","title":"API","text":"fillVolumeSpheres","category":"page"},{"location":"API.html#AgentBasedModels.fillVolumeSpheres","page":"API","title":"AgentBasedModels.fillVolumeSpheres","text":"Fill volume with spheres of certain radius. \n\nIn brief, the model generates a box with spheres in hexagonal packaging, removes the ones outside the volume.  The positions are perturbed by the noise term and finally the system is left to relax by a simple particle model.\n\nParameters\n\nf (Function) Function that returns true if center of sphere is inside the volume\nbox (Array{Float,2}) Maximum box where to fill the volumes.\nr (Number) Radius of the spheres\n\nOptional keyword parameters\n\nN (Int) Maximum number of particles inside the volume. If NaN (default), there is not upper bound.\nnoise (Number) Noise ratio used to perturb the particles from the hexagonal lattice.\nplatform (String) Platform in which perform the relaxation step after the noise perturbation.\n\nExample\n\njulia> using AgentBasedModels;\njulia> f(x,y,z) = sqrt(x^2+y^2+z^2) < 10;\njulia> pos = fillVolumeSpheres(f,[[-10,-10,-10],[10,10,10]],1,noise=0.25);\n\n(Image: Figure) Figure rendered with Makie.jl using meshscatter function.\n\n\n\n\n\n","category":"function"}]
}