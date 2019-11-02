<?php

namespace SC\Http\Controllers\System;

use Illuminate\Http\Request;
use SC\Http\Controllers\Controller;
use SC\Models\System\SavedState;
use Auth;

class AjaxController extends Controller {
   public function saveCurrentState(Request $request, $id = false) {
      if ($id) {
         $saveState = SavedState::where('id', $id)->first();
         $saved = $saveState->update([
            'languageID' => $request->languageID,
            'nameField' => $request->nameField,
            'data' => json_encode($request->data),
            'current' => true,
         ]);
      } else {
         $saveState = $saved = Auth::user()->savedStates()->create([
            'itemID' => $request->itemID,
            'languageID' => $request->languageID,
            'type' => $request->type,
            'current' => true,
            'nameField' => $request->nameField,
            'data' => json_encode($request->data),
         ]);
      }

      if ($saved) {
         return ['status' => 'ok', 'data' => $saveState];
      } else {
         return response()->json(['status' => 'error', 'errors' => __('generic.cantSaveState')], 422);
      }
   }

   public function setCurrentState(SavedState $savedState, Request $request) {
      if ($savedState->update(['current' => $request->status])) {
         Auth::user()->savedStates()->where('id', '!=', $savedState->id)->update(['current' => false]);
         return ['status' => 'ok'];
      } else {
         return response()->json(['status' => 'error', 'errors' => __('generic.cantSetCurrentSavedState')], 422);
      }
   }
}
