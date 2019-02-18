<?php

namespace SC\Libs;

class Filter {
   protected $model;

   function __construct($model, $collumns, $resultsPerPage) {
      $this->model = $model;

      $resultsPerPage = request()->has('paginate') ? request()->input('paginate') : $resultsPerPage;

      foreach ($collumns as $coll) {
         if (request()->has($coll)) {
            if ($this->aplyPivotIfExists($coll)) {
               continue;
            }

            if ($coll == 'id' || substr($coll, -2) == 'ID' || substr($coll, -3) == '_id') {
               $this->model = $this->model->where($coll, request()->input($coll));
               continue;
            }

            $this->model = $this->model->where($coll, 'LIKE', '%'.request()->input($coll).'%');
         }
      }

      $appends = request()->only($collumns);

      if (request()->has('startDate')) {
         $this->model = $this->model->where('created_at', '>=', request()->input('startDate'));
         $appends['startDate'] = request()->input('startDate');
      }

      if (request()->has('endDate')) {
         $this->model = $this->model->where('created_at', '<=', request()->input('endDate'));
         $appends['endDate'] = request()->input('endDate');
      }

      if (request()->has('sortBy')) {
         $this->model = $this->model->orderBy(request()->input('sortBy'), request()->input('sortDir'));
         $appends['sortBy'] = request()->input('sortBy');
         $appends['sortDir'] = request()->input('sortDir');
      } else {
         $this->model = $this->model->orderBy('id', 'DESC');
      }
      $this->model = $resultsPerPage ? $this->model->paginate($resultsPerPage)->appends($appends) : $this->model->get();
   }

   public function intercept($callback) {
      foreach ($this->model as $key => $model) {
         $this->model[$key] = $callback($model);
      }
   }

   public function get($view, $key, $viewVars = []) {
      if (request()->ajax()) {
         return response()->json(['data' => $this->model]);
      }
      return view($view)->with(array_merge([$key => $this->model], $viewVars));
   }

   private function aplyPivotIfExists($coll) {
      if (strpos($coll, '|')) {
         $pivot = explode('|', $coll);
         $newColl = $pivot[0];
         $pivot = explode(':', $pivot[1]);
         $modelName = '\\SC\\Models\\'.$pivot[0];
         $model = new $modelName();
         $idsArr = [];

         $model = $model->where($pivot[1], 'LIKE', '%'.request()->input($coll).'%');
         foreach ($model->get() as $m) {
            $idsArr[] = $m->id;
         }
         $this->model = $this->model->whereIn($newColl, $idsArr);
         return true;
      }
      return false;
   }
}