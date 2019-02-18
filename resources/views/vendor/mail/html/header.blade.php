<tr>
    <td class="header">
      <table>
         <tr>
            <td class="logo">
               <a href="{{ config('app.url') }}">{{ config('app.name') }}</a>
            </td>
            <td class="greeting">
               @if (!empty($greeting))
                  {{ $greeting }}
               @else
                  @if (!empty($level) && $level === 'error')
                     @lang('generic.whoops')!
                  @else
                     @lang('generic.hello')!
                  @endif
               @endif
            </td>
         </tr>
      </table>

    </td>
</tr>
