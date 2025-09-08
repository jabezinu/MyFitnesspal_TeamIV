<?php

namespace App\Http\Controllers;

use Throwable;
use Illuminate\Http\Request;
use App\Models\ExerciseDatabase;
use Illuminate\Validation\ValidationException;

class ExerciseDatabaseController extends Controller
{
    public function search(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:100',
            ]);
            
            $exercises = ExerciseDatabase::where('exercise_name', 'LIKE', "%{$request['name']}%")
            ->where(function ($query) {
                $query->where('created_by_user_id', auth()->id())
                ->orWhereNull('created_by_user_id');
            })->get();
                
                return response()->json($exercises);
                
            } catch (ValidationException $e) {
                return response()->json(['message' => 'Error: ' . $e->errors()], 422);
            } catch (Throwable $e) {
                return response()->json(['message' => 'Something went wrong.'], 500);
            }
        }
        // Get the name and id of exercises
    public function index()
    {
        // if(auth()->user()->role != 'admin'){
            $exercises = ExerciseDatabase::where('is_verified', true)
                                        ->where('is_public', true)->get(['exercise_id','exercise_name']);
            return response()->json([
                'message'=>'success',
                'exercises'=>$exercises
            ],200);
        // }
        // $exercises = ExerciseDatabase::all();
        // return response()->json([
        //         'message'=>'success',
        //         'exercises'=>$exercises
        //     ],200);
    }
    // Get the name of all exercises that are created by this user
    public function myExercises(){
        $user = auth()->user();
        $exercises = ExerciseDatabase::where('created_by_user_id', $user->id)->get('exercise_name');
        return response()->json([
            'message'=>'success',
            'exercises'=>$exercises
        ],200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $request->validate([
                'exercise_name'=>'required|string|max:100',
                'exercise_type'=>'required|in:cardiovascular,strength,flexibility,sports,other',
                'calories_per_minute'=>'required|numeric|min:0',
                'description'=>'string',
                'instructions'=>'string',
                'muscle_groups'=>'array',
                'muscle_groups.*'=>'string|max:50',
                'equipment_needed'=>'string',
                'difficulty_level'=>'string|in:beginner,intermediate,advanced'
            ]);

            $request['created_by_user_id'] = $request->user()->id;
            $exercise = ExerciseDatabase::create($request->all());
            return response()->json([
                'message'=>'exercise added',
                'data'=>$exercise
            ],201);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{    
            // if(auth()->user()->role != 'admin'){
                $exercise = ExerciseDatabase::where('exercise_id', $id)
                ->where(function ($query) {
                    $query->where('created_by_user_id', auth()->user()->id)
                        ->orWhereNull('created_by_user_id');
                })->first(['exercise_name', 'exercise_type', 'calories_per_minute', 'description', 'instructions', 'muscle_groups', 'equipment_needed', 'difficulty_level']);

            return response()->json($exercise);
            // }
            // $exercise = ExerciseDatabase::where('exercise_id', $id)->firstOrFail();
            // return response()->json($exercise);
        }catch(Throwable $e){
            return response()->json(['message'=>'Error: ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $validated = $request->validate([
                'exercise_name'=> 'string|max:100',
                'exercise_type'=> 'in:cardiovascular,strength,flexibility,sports,other',
                'calories_per_minute' => 'numeric|min:0',
                'description'=> 'nullable|string',
                'instructions'=> 'nullable|string',
                'muscle_groups'=> 'array',
                'muscle_groups.*'=> 'string|max:50',
                'equipment_needed'=> 'string',
                'difficulty_level'=> 'string|in:beginner,intermediate,advanced',
            ]);

            $exercise = ExerciseDatabase::where('exercise_id', $id)
                ->where('created_by_user_id', auth()->user()->id)
                ->firstOrFail();
    
            $exercise->update(...$validated());
    
            return response()->json([
                'message' => 'Exercise updated successfully',
                'exercise' => $exercise
            ]);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],422);
        }

    }

    // Remove an exercise that is created by the user
    public function destroy(string $id)
    {
        try{    
            $userId = auth()->user()->id;
            // if(auth()->user()->role != 'admin'){
                $exercise = ExerciseDatabase::where('exercise_id', $id)
                    ->where('created_by_user_id', $userId)
                    ->where('is_public', false)
                    ->firstOrFail();
            // }else{
            //     $exercise = ExerciseDatabase::where('exercise_id', $id)->firstOrFail();
            // }
            $exercise->delete();

            return response()->json([
                'message' => 'Exercise deleted successfully.',
            ]);
        }catch(Throwable $e){
            return response()->json([
                'message'=>'Error: ' . $e->getMessage()
            ],404);
        }
    }
}
