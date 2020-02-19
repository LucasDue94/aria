package br.com.hospitaldocoracaoal

class UrlMappings {

    static mappings = {
        group "/api", {
            delete "/$controller/$id(.$format)?"(action: "delete")
            get "/$controller(.$format)?"(action: "index")
            get "/$controller/$id(.$format)?"(action: "show")
            post "/$controller(.$format)?"(action: "save")
            put "/$controller/$id(.$format)?"(action: "update")
            patch "/$controller/$id(.$format)?"(action: "patch")

            get '/registroAtendimento/internamentos'(controller: "registroAtendimento", action: 'listInternamentos')
            get "/report/ecg(.$format)?"(controller: "ecg", action: 'gerarEcg')
            get "/report/balao(.$format)?"(controller: "balao", action: 'gerarBalao')
            get '/registroAtendimento/urgencias'(controller: "registroAtendimento", action: 'listUrgencias')
            get '/setor/admissoes'(controller: "setor", action: 'admissions')
            get '/apache/relatorio'(controller: "apache", action: 'report')
            get '/apache/notificacoes'(controller: "apache", action: 'notificacoes')
            get '/incidente/relatorio'(controller: "incidente", action: 'report')
        }

        "/"(uri: 'index.html')
        "404"(uri: 'index.html')
        "500"(view: '/error')
    }
}
