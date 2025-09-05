<?php


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterCompleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email:rfc|unique:users,email',
            'password' => 'required|string|min:10|regex:/^\S+$/',
            'username' => 'required|string|min:3|max:50|alpha_dash|unique:users,username',
            'agree_terms' => 'required|boolean|in:1,true',
        ];
    }
}
