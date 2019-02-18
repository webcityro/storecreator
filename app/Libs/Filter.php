<?php

namespace SC\Libs;

class Filter {
   protected $model;

   function __construct($model, $collumns, $resultsPerPage, $pivots = false) {
      $this->model = $model;
      $this->pivots($pivots);

      $resultsPerPage = request()->has('paginate') ? request()->input('paginate') : $resultsPerPage;

      foreach ($collumns as $coll) {
         if (request()->has($coll)) {
            if ($this->isColID($coll)) {
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

   private function pivots($pivots) {
      if (!$pivots) { return; }

      $pivots = is_array($pivots) ? $pivots : [$pivots];
      $pivotsArr = json_decode(request()->pivots, true);

      foreach ($pivots as $pivot) {
         $this->model = $this->model->with($pivot);

         if (!empty($pivotsArr) && in_array($pivot, array_keys($pivotsArr)) && request()->has($pivot)) {
            $col = $pivotsArr[$pivot];

            $this->model = $this->model->whereHas($pivot, function ($query) use($col, $pivot) {
               $query->where($col, $this->isColID($col) ? '=' : 'like', $this->isColID($col) ? request()->input($pivot) : '%'.request()->input($pivot).'%');
            });
         }
      }
   }

   private function isColID($col) {
      return $col == 'id' || substr($col, -2) == 'ID' || substr($col, -3) == '_id';
   }
}